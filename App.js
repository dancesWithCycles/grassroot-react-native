import React, {useState} from 'react';
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

    const startingPoint = [3.3362400, 6.5790100];
    const destinationPoint = [ 3.3750014, 6.5367877 ];
    const startDestinationPoints = [startingPoint,destinationPoint];

    const renderAnnotations=()=>{
	console.log('renderAnnotations...');
	return (
	    startDestinationPoints.map((point,index)=>{
		console.log('index: '+index);
		    <MapboxGL.PointAnnotation
		key={`${index}-startPointAnnotation`}
		id={`${index}-startPointAnnotation`}
		coordinate={point}
		    >
		    <View
		style={styles.pointView}
		    />
		</MapboxGL.PointAnnotation>
	    })
	);
    }

    /*TODO: What is the difference between prop zoomLevel for MapView and for Camera?*/
    return (
    <View style={styles.page}>
      <View style={styles.container}>
          <MapboxGL.MapView
	style={styles.map}
	zoomLevel={16}
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
