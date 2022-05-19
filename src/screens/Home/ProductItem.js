import React from 'react';
import {View, Text, Dimensions, Pressable} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import {productImageUrl} from '../../constants/app';
import colors from '../../constants/colors';

const {width} = Dimensions.get('window');
function ProductItem({item, navigation}) {
  const product = item.item;
  return (
    <View style={{width: '50%', marginBottom: 10}}>
      <Pressable
        onPress={() => navigation.navigate('ProductDetails', {product})}>
        {product.images.length > 0 ? (
          <AutoHeightImage
            source={{uri: productImageUrl + product.images[0].name}}
            width={width / 2 - 30}
            style={{borderRadius: 10}}
            loadingIndicatorSource={require('../../../assets/placeholder_image.jpg')}
            // onError={error => console.log(error)}
          />
        ) : (
          <Icon name="image" size={width / 2 - 30} />
        )}
      </Pressable>
      <Text
        style={{
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 5,
          color: colors.BLACK,
        }}
        numberOfLines={1}>
        {product.name}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: colors.GREY_CHATEAU,
          paddingHorizontal: 10,
        }}>
        Status: {product.isHidden == '0' ? 'Visible' : 'Hidden'}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: colors.APPBAR_HEADER_COLOR,
          paddingHorizontal: 10,
        }}>
        {product.price} RWF
      </Text>
    </View>
  );
}

export default ProductItem;
