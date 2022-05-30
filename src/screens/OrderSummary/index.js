import React from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../constants/colors';
function OrderSummary() {
  const {cart} = useSelector(state => state.cart);
  const {selectedLocation} = useSelector(state => state.locations);
  return (
    <View style={{flex: 1, backgroundColor: colors.BACKGROUND_COLOR}}>
      <ScrollView>
        <View style={{padding: 10}}>
          <Text>Total amount</Text>
          <View style={{marginTop: 15}}>
            <Text style={{marginBottom: 10, color: colors.BLACK}}>
              Delivery address
            </Text>
            <Text style={{color: colors.BLACK}}>
              {selectedLocation.address}
            </Text>
            <View style={{marginVertical: 20}}>
              <Text style={{marginBottom: 5, color: colors.BLACK}}>
                Delivery address more information (optional)
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.WHITE,
                  borderColor: colors.BORDER_COLOR,
                  padding: 10,
                  borderRadius: 5,
                  borderWidth: 1,
                }}
                multiline={true}
                placeholder="Delivery address more info (optional)"
              />
            </View>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                backgroundColor: colors.APPBAR_HEADER_COLOR,
                paddingHorizontal: 25,
                paddingVertical: 15,
                borderRadius: 10,
                marginTop: 10,
              }}>
              <Text style={{color: colors.WHITE, textAlign: 'center'}}>
                Checkout Now
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default OrderSummary;
