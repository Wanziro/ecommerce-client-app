import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {imageUrl} from '../../constants/app';
import {calculateCartTotal, formatMoney} from '../../helpers';
import {removeItemFromCart, updateCartItem} from '../../actions/cart';
const {width, height} = Dimensions.get('window');
function Cart() {
  const dispatch = useDispatch();
  const {cart} = useSelector(state => state.cart);
  const handlePlus = item => {
    dispatch(updateCartItem({...item, quantity: item.quantity + 1}));
  };
  const handleMinus = item => {
    if (item.quantity - 1 > 0) {
      dispatch(updateCartItem({...item, quantity: item.quantity - 1}));
    } else {
      dispatch(updateCartItem({...item, quantity: 1}));
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.BACKGROUND_COLOR,
        paddingHorizontal: 10,
      }}>
      {cart.length > 0 ? (
        <View>
          <View style={{paddingTop: 10, height: height - 200}}>
            <ScrollView>
              {cart.map((item, i) => (
                <View
                  key={i}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: colors.WHITE,
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}>
                  {item.product.images.length > 0 ? (
                    <Image
                      source={{uri: imageUrl + item.product.images[0].name}}
                      style={{width: 80, height: 80, borderRadius: 10}}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/placeholder_image.jpg')}
                      style={{width: 80, height: 80, borderRadius: 10}}
                    />
                  )}
                  <View style={{flex: 1, marginHorizontal: 10}}>
                    <Text style={{color: colors.BLACK}}>
                      {item.product.name}
                    </Text>
                    <Text style={{color: colors.GRAY}} numberOfLines={1}>
                      {item.product.description}
                    </Text>
                    <Text style={{color: colors.APPBAR_HEADER_COLOR}}>
                      Price: {formatMoney(item.product.price)} RW
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{color: colors.BLACK}}>Qunantiy: </Text>
                      <Pressable onPress={() => handleMinus(item)}>
                        <Text
                          style={{
                            fontSize: 30,
                            color: colors.BLACK,
                            fontWeight: 'bold',
                            paddingHorizontal: 5,
                            marginLeft: 25,
                          }}>
                          -
                        </Text>
                      </Pressable>

                      <Text
                        style={{
                          fontSize: 20,
                          color: colors.BLACK,
                          flex: 1,
                          marginHorizontal: 10,
                          textAlign: 'center',
                        }}>
                        {item.quantity}
                      </Text>
                      <Pressable
                        onPress={() => {
                          handlePlus(item);
                        }}>
                        <Text
                          style={{
                            fontSize: 30,
                            color: colors.FOOTER_BODY_TEXT_COLOR,
                            paddingHorizontal: 5,
                          }}>
                          +
                        </Text>
                      </Pressable>
                    </View>
                    <Text style={{color: colors.BLACK}}>
                      Sub total:{' '}
                      {formatMoney(item.product.price * item.quantity)}
                      RWF
                    </Text>
                    <View style={{alignItems: 'flex-end'}}>
                      <TouchableOpacity
                        onPress={() =>
                          dispatch(removeItemFromCart(item.product.id))
                        }>
                        <Text
                          style={{
                            paddingLeft: 10,
                            color: colors.APPBAR_HEADER_COLOR,
                          }}>
                          Remove
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              paddingTop: 15,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{color: colors.BLACK, fontSize: 20}}>
              TOTAL: {formatMoney(calculateCartTotal(cart))} RWF
            </Text>
            <View
              style={{
                backgroundColor: colors.APPBAR_HEADER_COLOR,
                padding: 10,
                borderRadius: 5,
              }}>
              <Text style={{color: colors.WHITE, fontSize: 18}}>
                Checkout Now
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="exclamationcircleo"
            size={70}
            color={colors.APPBAR_HEADER_COLOR}
          />
          <Text style={{color: colors.GRAY, marginTop: 10}}>
            No items in the cart
          </Text>
        </View>
      )}
    </View>
  );
}

export default Cart;
