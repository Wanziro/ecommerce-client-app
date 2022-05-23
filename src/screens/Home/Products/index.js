import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../../constants/colors';
import PlaceHolder from './Placeholder';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import ProductItem from './ProductItem';
const {height} = Dimensions.get('window');
function Products() {
  const {products, loadingProducts, loadingProductsError} = useSelector(
    state => state.products,
  );
  return (
    <View style={{padding: 15}}>
      <Text style={{color: colors.BLACK}}>Available Products</Text>
      {loadingProducts && products.length === 0 ? (
        <PlaceHolder />
      ) : (
        <>
          {products.length > 0 ? (
            <>
              {products.map((item, i) => (
                <ProductItem key={i} product={item} />
              ))}
            </>
          ) : (
            <>
              {loadingProductsError == '' ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: height / 2,
                  }}>
                  <Icon name="sad" size={50} color={colors.GAINSBORO} />
                  <Text>No products found from this supplier</Text>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: height / 2,
                  }}>
                  <Icon name="sad" size={50} color={colors.GAINSBORO} />
                  <Text>{loadingProductsError}</Text>
                </View>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
}

export default Products;
