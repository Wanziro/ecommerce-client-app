import React from 'react';
import {View, Text, Image} from 'react-native';
import colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import {productImageUrl} from '../../constants/app';
function OrderItem({item}) {
  const order = item.item;
  const calculateTotal = () => {
    const price = parseFloat(order.soldPrice);
    const q = parseInt(order.quantity, 10);
    return price * q;
  };
  return (
    <View
      style={{
        backgroundColor: colors.WHITE,
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginBottom: 5,
        }}>
        <Text style={{color: colors.BLACK, fontSize: 20}}>Order ID</Text>
        <Text style={{color: colors.BLACK, fontSize: 20}}>#{order.orderId}</Text>
      </View>
     
      <Text style={{marginBottom: 10}}>Product information</Text>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View>
          {order.product.images.length > 0 ? (
            <Image
              source={{uri: productImageUrl + order.product.images[0].name}}
              style={{width: 100, height: 80, borderRadius: 10}}
            />
          ) : (
            <Icon name="image" size={100} color={colors.BLACK} />
          )}
        </View>
        <View style={{paddingLeft: 10, flex: 1}}>
          <Text style={{color: colors.BLACK}}>{order.product.name}</Text>
          <Text style={{color: colors.BLACK}}>
            Sold Price: {order.soldPrice}
          </Text>
          <Text style={{color: colors.BLACK}}>Quantity: {order.quantity}</Text>
          
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text style={{color: colors.APPBAR_HEADER_COLOR, fontSize: 18}}>
            Total:
          </Text>
          <Text style={{color: colors.APPBAR_HEADER_COLOR, fontSize: 18}}>
            {calculateTotal()} RWF
          </Text>
        </View>
        </View>
        
      </View>
      <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text style={{color: colors.BLACK}}>Transaction Date:</Text>
          <Text style={{color: colors.BLACK}}>{order.date}</Text>
        </View>
    </View>
  );
}

export default OrderItem;
