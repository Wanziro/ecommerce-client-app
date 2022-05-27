import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {ALERT_TYPE, Dialog, Root, Toast} from 'react-native-alert-notification';
import Modal from 'react-native-modal';
function DeliveryLocations({navigation}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <StatusBar backgroundColor={colors.APPBAR_HEADER_COLOR} />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND_COLOR,
          position: 'relative',
        }}>
        <Text>testin location</Text>

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
            <Pressable>
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
