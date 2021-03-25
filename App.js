import React,{useState} from 'react';
import {StyleSheet,View,Image} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
    'pk.eyJ1IjoiZGFuY2Vzd2l0aGN5Y2xlcyIsImEiOiJja205eXR5bzkxbW96Mndxc3p6dHV1c3Q3In0.lzOkgTEjmXQmmT_3ak_J2Q',
);

const coordinates = [
  [-73.98330688476561, 40.76975180901395],
  [-73.96682739257812, 40.761560925502806],
  [-74.00751113891602, 40.746346606483826],
  [-73.95343780517578, 40.7849607714286],
  [-73.99017333984375, 40.71135347314246],
  [-73.98880004882812, 40.758960433915284],
  [-73.96064758300781, 40.718379593199494],
  [-73.95172119140624, 40.82731951134558],
  [-73.9829635620117, 40.769101775774935],
  [-73.9822769165039, 40.76273111352534],
  [-73.98571014404297, 40.748947591479705]
]

const App = () => {
    /*TODO: Decide if this array or the above is used to render points!*/
    /*TODO: const [coordinates,setCoordinates]=useState([[-76.82878274, 39.20821176]]);*/

    const renderAnnotation=(counter)=>{
	console.log('renderAnnotation...');
	const id=`pointAnnotation${counter}`;
	const coordinate=coordinates[counter];
	const title=`Longitude: ${coordinates[counter][0]} Latitude: ${coordinates[counter][1]}`;
	console.log('title: '+title);
	return(
		<MapboxGL.PointAnnotation
	    key={id}
	    id={id}
	    title={title}
	    coordinate={coordinate}
		>
		<View
	style={styles.pointView}/>

		</MapboxGL.PointAnnotation>
	);
    }

    const renderAnnotations=()=>{
	console.log('renderAnnotations...');
	const items=[];
	for(let i=0;i<coordinates.length;i++){
	    console.log('i: '+i);
	    items.push(renderAnnotation(i));
	}
	console.log('items: '+items.length);
	return items;
    }

    /*TODO:
What is the difference between prop zoomLevel for MapView and for Camera?
Map does only centers on points if Camera component is present! Why?
*/
    return (
    <View style={styles.page}>
	    <View style={styles.container}
	    >
          <MapboxGL.MapView
	style={styles.map}
	zoomLevel={13}
	showUserLocation={true}
	useTrackingMode={1}
	centerCoordinate={coordinates[0]}
	    >
	    <MapboxGL.Camera zoomLevel={11} centerCoordinate={coordinates[0]}/>
	    {renderAnnotations()}
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
