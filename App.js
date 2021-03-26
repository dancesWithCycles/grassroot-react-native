import React, {useState,useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {lineString as makeLineString} from '@turf/helpers';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';

const accessToken='pk.eyJ1IjoiZGFuY2Vzd2l0aGN5Y2xlcyIsImEiOiJja205eXR5bzkxbW96Mndxc3p6dHV1c3Q3In0.lzOkgTEjmXQmmT_3ak_J2Q';
MapboxGL.setAccessToken(
    accessToken,
);

/*{accessToken: 'MAPBOX_TOKEN_GOES_HERE'}*/
const directionsClient = MapboxDirectionsFactory({
    accessToken:`${accessToken}`
});

const App = () => {
    const [coordinates] = useState([-76.82878274, 39.20821176]);
    const [route,setRoute]=useState(null);

    const startingPoint = [3.3362400, 6.5790100];
    const destinationPoint = [ 3.3750014, 6.5367877 ];
    const startDestinationPoints = [startingPoint,destinationPoint];


    //fetch direction
    useEffect(()=>{
        // setting interval: similar to ComponentDidMount
        const timer=setInterval(()=>{
	    fetchRoute();
        },10000);
        // clearing interval: similar to ComponentWillUnmount
        return ()=>clearInterval(timer);
    })

    const fetchRoute=async()=>{
	console.log('fetchRoute...');
	const reqOptions={
	    waypoints:[
		{coordinates:startingPoint},
		{coordinates:destinationPoint},
	    ],
	    profile:'driving-traffic',
	    geometries:'geojson',
	};

	const res=await directionsClient.getDirections(reqOptions).send();
	const newRoute=makeLineString(res.body.routes[0].geometry.coordinates);
	setRoute(newRoute);
    };

    const renderAnnotations=()=>{
	console.log('renderAnnotations...');
	return (
	    startDestinationPoints.map((point,index)=>(
		    <MapboxGL.PointAnnotation
		key={`${index}-PointAnnotation`}
		id={`${index}-PointAnnotation`}
		coordinate={point}
		    >
		    <View
		style={styles.pointView}
		    />
		</MapboxGL.PointAnnotation>
	    ))
	);
    }

    /*TODO: What is the difference between prop zoomLevel for MapView and for Camera?*/
    return (
    <View style={styles.page}>
      <View style={styles.container}>
          <MapboxGL.MapView
	style={styles.map}
	zoomLevel={11}
	centerCoordinate={coordinates}
	    >
            <MapboxGL.Camera
	zoomLevel={8}
	centerCoordinate={startingPoint}
	annimationDuration={0}
	    />
	{renderAnnotations()}
	{/*TODO: How to pass array to a function or component? <RenderPoint
    id='pointAnnotation'
    key='pointAnnotation'/>*/}
	{route && (
		<MapboxGL.ShapeSource
	    id='shapeSource'
	    shape={route}
		>
		<MapboxGL.LineLayer
	    id='lineLayer'
	    style={{lineWidth: 5, lineJoin: 'bevel', lineColor: '#ff0000'}}
		/>
		</MapboxGL.ShapeSource>
	)
	}
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#3f00ff',
  },
  map: {
    flex: 1,
  },
    pointView:{
	height:30,
	width:30,
	backgroundColor:'#3f00ff',
	borderRadius:50,
	borderColor:'#fff',
	borderWidth:3,
    },
});

export default App;
