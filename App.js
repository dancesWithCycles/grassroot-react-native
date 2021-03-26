/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Button,StyleSheet,View,Text} from 'react-native';

import LocationEnabler from "react-native-location-enabler"

const {
  PRIORITIES: { HIGH_ACCURACY },
  useLocationSettings,
} = LocationEnabler

const App=()=>{
  const [enabled, requestResolution] = useLocationSettings(
    {
      priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
      alwaysShow: true, // default false
      needBle: true, // default false
    },
    false /* optional: default undefined */,
  )

  return (
	  <View
      style={styles.sectionContainer}
	  >
	  <Text
      style={styles.sectionTitle}
	  >
	  Location Enabler
      </Text>
      {!enabled && (
              <Button
	  onPress={requestResolution}
	  title="Request Resolution Location Settings"
	  style={styles.sectionDescription}/>
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
