import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Pressable,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {ALERT_TYPE, Dialog, Root, Toast} from 'react-native-alert-notification';
import Modal from 'react-native-modal';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {API_KEY} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {
  addLocation,
  removeLocation,
  setSelectedLocation,
} from '../../actions/locations';
function DeliveryLocations({navigation}) {
  const dispatch = useDispatch();
  const {locations} = useSelector(state => state.locations);
  const [showModal, setShowModal] = useState(false);

  Geocoder.init(API_KEY, {language: 'en'});
  const handleGetCurrentLocation = () => {
    try {
      Geolocation.getCurrentPosition(info => {
        console.log(info);
        Geocoder.from(info.coords.latitude, info.coords.longitude)
          .then(json => {
            const addressComponent = json.results[0].formatted_address;
            dispatch(
              addLocation({
                lat: info.coords.latitude,
                long: info.coords.longitude,
                address: addressComponent,
              }),
            );
            dispatch(
              setSelectedLocation({
                lat: info.coords.latitude,
                long: info.coords.longitude,
                address: addressComponent,
              }),
            );
            setShowModal(false);
          })
          .catch(error => console.warn(error));
      });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error.message + '. Try again later.',
      });
    }
  };
  return (
    <>
      <StatusBar backgroundColor={colors.APPBAR_HEADER_COLOR} />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND_COLOR,
          position: 'relative',
        }}>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 20, color: colors.FOOTER_BODY_TEXT_COLOR}}>
            Saved Locations
          </Text>
          <ScrollView>
            {locations.map((item, i) => (
              <TouchableOpacity key={i}>
                <View
                  style={{
                    marginVertical: 10,
                    backgroundColor: colors.WHITE,
                    borderRadius: 10,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Icon name="location" size={30} color={colors.BLACK} />
                  <Text
                    style={{
                      color: colors.BLACK,
                      flex: 1,
                      marginHorizontal: 20,
                    }}>
                    {item.address}
                  </Text>
                  <TouchableOpacity
                    onPress={() => dispatch(removeLocation(item))}>
                    <View style={{marginLeft: 10}}>
                      <Icon
                        name="trash"
                        size={30}
                        color={colors.APPBAR_HEADER_COLOR}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{position: 'absolute', right: 0, bottom: 0}}>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 80,
                width: 80,
                backgroundColor: colors.APPBAR_HEADER_COLOR,
                borderRadius: 100,
                marginBottom: 20,
                marginRight: 20,
              }}>
              <Icon name="add" size={45} color={colors.WHITE} />
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          animationIn="zoomIn"
          animationOut="zoomOut"
          isVisible={showModal}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              padding: 20,
              borderRadius: 10,
              position: 'relative',
              paddingTop: 30,
            }}>
            <Pressable onPress={() => handleGetCurrentLocation()}>
              <View
                style={{
                  backgroundColor: colors.APPBAR_HEADER_COLOR,
                  padding: 10,
                  marginVertical: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Icon name="location-sharp" size={30} color={colors.WHITE} />
                <Text
                  style={{
                    color: colors.WHITE,
                    fontSize: 20,
                  }}>
                  Current Location
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setShowModal(false);
                navigation.navigate('SearchLocation');
              }}>
              <View
                style={{
                  backgroundColor: colors.APPBAR_HEADER_COLOR,
                  padding: 10,
                  marginVertical: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="search" size={30} color={colors.WHITE} />
                <Text
                  style={{
                    color: colors.WHITE,
                    fontSize: 20,
                  }}>
                  Search Location
                </Text>
              </View>
            </Pressable>

            <View style={{position: 'absolute', right: 0, top: 0}}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <View style={{padding: 5}}>
                  <Icon
                    name="close"
                    size={30}
                    color={colors.CARD_SHADOW_COLOR}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Root theme="dark" />
      </View>
    </>
  );
}

export default DeliveryLocations;
