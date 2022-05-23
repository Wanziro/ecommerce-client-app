import React from 'react';
import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import {imageUrl} from '../../../constants/app';
import colors from '../../../constants/colors';
import {formatMoney} from '../../../helpers';
function ProductItem({
  product,
  setPreviewProduct,
  setShowModal,
  setQuantity,
  handleAddToCart,
}) {
  return (
    <View
      style={{
        backgroundColor: colors.WHITE,
        padding: 10,
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 10,
      }}>
      <Pressable
        onPress={() => {
          setPreviewProduct(product);
          setShowModal(true);
        }}>
        {product.images.length > 0 ? (
          <Image
            source={{uri: imageUrl + product.images[0].name}}
            style={{width: 80, height: 80, borderRadius: 10}}
          />
        ) : (
          <Image
            source={require('../../../../assets/placeholder_image.jpg')}
            style={{width: 80, height: 80, borderRadius: 10}}
          />
        )}
      </Pressable>
      <View style={{flex: 1, marginHorizontal: 10}}>
        <Pressable
          onPress={() => {
            setPreviewProduct(product);
            setShowModal(true);
          }}>
          <Text style={{color: colors.BLACK}}>{product.name}</Text>
          <Text style={{color: colors.GRAY}} numberOfLines={1}>
            {product.description}
          </Text>
          <Text style={{color: colors.APPBAR_HEADER_COLOR}} numberOfLines={3}>
            {formatMoney(product.price)} RW
          </Text>
        </Pressable>
      </View>
      <TouchableOpacity
        onPress={() => {
          setQuantity(1);
          setPreviewProduct(product);
          handleAddToCart();
        }}>
        <View style={{paddingBottom: 15}}>
          <Text style={{fontSize: 35, color: colors.BLACK}}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ProductItem;
