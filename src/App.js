import React, {useState,useEffect} from 'react';
import {View,SafeAreaView} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

import others from './styles/others';
import sheet from './styles/sheet';
import colors from './styles/colors';
import config from './utils/config';
import {IS_ANDROID} from './utils';

MapboxGL.setAccessToken(config.get('accessToken'));

class App extends React.Component{
    constructor(props){
	super(props);
	this.state={
	    coordinates:[-76.82878274, 39.20821176],
	    isFetchingPermission:IS_ANDROID,
	    isPermissionGranted:false,
	    timestamp: 0,
	    latitude: 0.0,
	    longitude: 0.0,
	    altitude: 0.0,
	    heading: 0.0,
	    accuracy: 0.0,
	    speed: 0.0,
	};

	    this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);
  }


    onUserLocationUpdate(location) {
	this.setState({
	    timestamp: location.timestamp,
	    latitude: location.coords.latitude,
	    longitude: location.coords.longitude,
	    altitude: location.coords.altitude,
	    heading: location.coords.heading,
	    accuracy: location.coords.accuracy,
	    speed: location.coords.speed,
	});
	console.log('usr loc ts: '+this.state.timestamp);
	console.log('usr loc lat: '+this.state.latitude);
	console.log('usr loc lon: '+this.state.longitude);
    }

    async componentDidMount(){
	console.log('componentDidMount...');
	if(IS_ANDROID){
	    const isGranted=await MapboxGL.requestAndroidLocationPermissions();
	    console.log('isGranted: ')
	    console.log(isGranted?'true':'false')
	    this.setState({
		isPermissionGranted:isGranted,
		isFetchingPermission:false,
	    });
	}
    }

    render(){
	if(IS_ANDROID && !this.state.isPermissionGranted){
	    console.log('Android os without permission');
	    if(this.state.isFetchingPermission){
		console.log('App is fetching permission');
		/*TODO: What are we rendering during this phase?*/
		return null;
	    }else{
		console.log('Something unsupported happened!');
	    }

	    return (
		    <SafeAreaView
		style={[
		    sheet.matchParent,
		    {backgroundColor:colors.primary.indigo}]}
		forceInset={{top: 'always'}}
		    >
		    <View style={sheet.matchParent}>
		    <Text style={others.noPermissionsText}>
		You need to accept location permissions in order to use this example applications
		</Text>
		</View>
		</SafeAreaView>
	    );
	}

	/*TODO: What is the difference between prop zoomLevel for MapView and for Camera?*/
	return (
		<View style={others.page}>
		<View style={others.container}>
		<MapboxGL.MapView
	    style={others.map}
	    zoomLevel={0}
		>
		<MapboxGL.UserLocation
            visible={true}
            showsUserHeadingIndicator={true}
            onUpdate={this.onUserLocationUpdate}
		/>
		<MapboxGL.Camera
            defaultSettings={{
              centerCoordinate:[-76.82878274, 39.20821176],
              zoomLevel: 0,
	    }}
	    followUserLocation={true}
	    followUserMode={'normal'}
	    annimationDuration={0}
		/>
	    </MapboxGL.MapView>
	    </View>
	    </View>
	);
    }
}

export default App;
