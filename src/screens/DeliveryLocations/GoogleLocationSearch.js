import React from 'react';
import {View, Text} from 'react-native';
import {API_KEY} from '@env';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
navigator.geolocation = require('@react-native-community/geolocation');

function GoogleLocationSearch() {
  return (
    <View style={{backgroundColor: colors.BACKGROUND_COLOR, flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder="Enter search keyword"
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: API_KEY,
          language: 'en',
          components: 'country:rw',
        }}
        currentLocation={true}
        currentLocationLabel="Current location"
      />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{padding: 10}}>Cyizere Allrights reserved.</Text>
      </View>
    </View>
  );
}

export default GoogleLocationSearch;
