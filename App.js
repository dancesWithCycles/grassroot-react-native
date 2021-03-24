import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import RenderPoint from './point';

MapboxGL.setAccessToken(
    'pk.eyJ1IjoiZGFuY2Vzd2l0aGN5Y2xlcyIsImEiOiJja205eXR5bzkxbW96Mndxc3p6dHV1c3Q3In0.lzOkgTEjmXQmmT_3ak_J2Q',
);

const App = () => {
  const [coordinates] = useState([-76.82878274, 39.20821176]);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera zoomLevel={8} centerCoordinate={coordinates} />
	  {RenderPoint('pointAnnotation','pointAnnotation')}
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
    backgroundColor: 'blue',
  },
  map: {
    flex: 1,
  },
});

export default App;
