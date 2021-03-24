import React, {useState} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
    'pk.eyJ1IjoiZGFuY2Vzd2l0aGN5Y2xlcyIsImEiOiJja205eXR5bzkxbW96Mndxc3p6dHV1c3Q3In0.lzOkgTEjmXQmmT_3ak_J2Q',
);

const App = () => {
    const initialCoordinates=[-76.82878274, 39.20821176];
    const [coordinates,setCoordinates]=useState(null);
    const onPressMap=event=>{
	console.log('onPressMap...');
	setCoordinates(event.geometry.coordinates);
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
      onPress={onPressMap}
	  >
          <MapboxGL.Camera
      zoomLevel={8}
      centerCoordinate={initialCoordinates}
	  />
          <MapboxGL.PointAnnotation
      coordinate={initialCoordinates}
      id="Test"
	  />
          </MapboxGL.MapView>
	  {coordinates?(
		  <View
	      style={styles.coordinateViewContainer}
		  >
		  <View style={styles.coordinateView}
		  >
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
    backgroundColor: 'blue',
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
