import React from 'react';
import {StyleSheet,View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

const renderPoint=props=>{
    const [id,key]=props
    console.log('id: '+id);
    console.log('key: '+key);
    /*TODO: Something is wrong with the arguments! Check log!*/
    return(
	    <MapboxGL.PointAnnotation
	id={id}
	key={key}
	coordinate={[-76.82878274,39.20821176]}>
	    <View
	style={styles.pointView}/>
	    </MapboxGL.PointAnnotation>
    );

}

const styles=StyleSheet.create({
    pointView:{
	height:30,
	width:30,
	backgroundColor:'#3f00ff',
	borderRadius:50,
	borderColor:'#fff',
	borderWidth:3,
    },
});

export default renderPoint;
