import React, {useState} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
    'pk.eyJ1IjoiZGFuY2Vzd2l0aGN5Y2xlcyIsImEiOiJja205eXR5bzkxbW96Mndxc3p6dHV1c3Q3In0.lzOkgTEjmXQmmT_3ak_J2Q',
);

const App = () => {
    const initialCoordinates=[-76.82878274, 39.20821176];
    const secondCoordinates=[-76.865876, 39.266044];
    const [coordinates,setCoordinates]=useState(null);
    const [selectedPoint,setSelectedPoint]=useState(null);
    /*TODO: How is the release handled?*/
    const onSelectPoint=event=>{
	console.log('onSelectPoint...');
	setCoordinates(event.geometry.coordinates);
	setSelectedPoint(event.properties.id);
    }
  return (
	  <View
      style={styles.page}
	  >
	  <View
      style={styles.container}
	  >
          <MapboxGL.MapView
      style={styles.map}
      onPress={event=>setCoordinates(event.geometry.coordinates)}
	  >
          <MapboxGL.Camera
      zoomLevel={8}
      centerCoordinate={initialCoordinates}
	  />
          <MapboxGL.PointAnnotation
      coordinate={initialCoordinates}
      id="first Point Annotation"
      onSelected={onSelectPoint}
	  />
          <MapboxGL.PointAnnotation
      coordinate={secondCoordinates}
      id="second Point Annotation"
      onSelected={onSelectPoint}
	  />
          </MapboxGL.MapView>
	  {coordinates?(
		  <View
	      style={styles.coordinateViewContainer}
		  >
		  <View style={styles.coordinateView}
		  >
		  {selectedPoint?<Text
		   style={styles.coordinateText}>
		   {selectedPoint},
		   </Text>:null}
		  <Text
	      style={styles.coordinateText}
		  >
		  lat: {coordinates[0]}, lon: {coordinates[1]}
			</Text>
			</View>
			</View>
		       ):null}
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
    coordinateViewContainer:{
	position:'absolute',
	bottom:0,
	padding:5,
	width:'100%',
	backgroundColor:'transparent',
    },
    coordinateView:{
	padding:5,
	backgroundColor:'#3f00ff',
	flex:1,
    },
    coordinateText:{
	color:'#fff',
    },
});

export default App;
