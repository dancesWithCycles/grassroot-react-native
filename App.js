import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
    'pk.eyJ1IjoiZGFuY2Vzd2l0aGN5Y2xlcyIsImEiOiJja205eXR5bzkxbW96Mndxc3p6dHV1c3Q3In0.lzOkgTEjmXQmmT_3ak_J2Q',
);

const App = () => {
    const [coordinates] = useState([-76.82878274, 39.20821176]);
    /*TODO: What is the difference between prop zoomLevel for MapView and for Camera?*/
    return (
    <View style={styles.page}>
      <View style={styles.container}>
          <MapboxGL.MapView
      style={styles.map}
      zoomLevel={11}>
            <MapboxGL.Camera
	zoomLevel={8}
	centerCoordinate={coordinates}
	annimationDuration={0}
	    />
          <MapboxGL.PointAnnotation coordinate={coordinates} id="Test" />
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
});

export default App;
