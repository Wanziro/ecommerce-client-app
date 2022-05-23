import React, {useState} from 'react';
import {View, Text, Dimensions, Image, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../../constants/colors';
import PlaceHolder from './Placeholder';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import ProductItem from './ProductItem';
import {imageUrl} from '../../../constants/app';
import {formatMoney} from '../../../helpers';
import Modal from 'react-native-modal';
const {height, width} = Dimensions.get('window');
function Products() {
  const {products, loadingProducts, loadingProductsError} = useSelector(
    state => state.products,
  );
  const [showModal, setShowModal] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <View style={{padding: 15}}>
        <Text style={{color: colors.BLACK}}>Available Products</Text>
        {loadingProducts && products.length === 0 ? (
          <PlaceHolder />
        ) : (
          <>
            {products.length > 0 ? (
              <>
                {products.map((item, i) => (
                  <ProductItem
                    key={i}
                    product={item}
                    setShowModal={setShowModal}
                    setPreviewProduct={setPreviewProduct}
                  />
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
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationOutTiming={700}
        isVisible={showModal}
        style={{padding: 0, margin: 0}}>
        <View
          style={{
            flex: 1,
            position: 'relative',
          }}>
          <Pressable
            onPress={() => {
              setQuantity(1);
              setShowModal(false);
              setPreviewProduct(null);
            }}>
            <View style={{height: '100%'}}></View>
          </Pressable>
          <View style={{position: 'absolute', bottom: 0, width}}>
            <View
              style={{
                backgroundColor: colors.WHITE,
                paddingHorizontal: 10,
                paddingVertical: 20,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}>
              <View
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View>
                  {previewProduct?.images.length > 0 ? (
                    <Image
                      source={{uri: imageUrl + previewProduct?.images[0].name}}
                      style={{width: 100, height: 100, borderRadius: 10}}
                    />
                  ) : (
                    <Image
                      source={require('../../../../assets/placeholder_image.jpg')}
                      style={{width: 80, height: 80, borderRadius: 10}}
                    />
                  )}
                </View>
                <View style={{flex: 1, marginLeft: 15}}>
                  <Text style={{color: colors.BLACK, fontSize: 20}}>
                    {previewProduct?.name}
                  </Text>
                  <Text style={{color: colors.BLACK}}>
                    {previewProduct?.description}
                  </Text>
                  <Text style={{color: colors.BLACK}}>
                    Price:
                    {previewProduct?.price
                      ? formatMoney(previewProduct.price)
                      : ''}{' '}
                    RWF
                  </Text>
                  <View
                    style={{
                      marginTop: 10,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Quantity: </Text>
                    <Pressable
                      onPress={() => {
                        quantity - 1 > 0 ? setQuantity(quantity - 1) : 1;
                      }}>
                      <View
                        style={{
                          marginVertical: 5,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          borderRadius: 5,
                          backgroundColor: colors.GAINSBORO,
                        }}>
                        <Text
                          style={{
                            color: colors.APPBAR_HEADER_COLOR,
                            fontSize: 25,
                            fontWeight: 'bold',
                          }}>
                          -
                        </Text>
                      </View>
                    </Pressable>
                    <Text
                      style={{
                        color: colors.APPBAR_HEADER_COLOR,
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      {quantity}
                    </Text>
                    <Pressable onPress={() => setQuantity(quantity + 1)}>
                      <View
                        style={{
                          marginVertical: 5,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          borderRadius: 5,
                          backgroundColor: colors.GAINSBORO,
                        }}>
                        <Text
                          style={{
                            color: colors.APPBAR_HEADER_COLOR,
                            fontSize: 25,
                            fontWeight: 'bold',
                          }}>
                          +
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                  <View style={{marginTop: 15}}>
                    <Text style={{color: colors.BLACK, fontSize: 20}}>
                      TOTAL: {formatMoney(previewProduct?.price * quantity)} RWF
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 15,
                      backgroundColor: colors.APPBAR_HEADER_COLOR,
                      padding: 15,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: colors.WHITE,
                        fontSize: 20,
                      }}>
                      Add to cart
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default Products;
