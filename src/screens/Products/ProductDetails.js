import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import Icon2 from 'react-native-vector-icons/dist/Feather';
import Icon3 from 'react-native-vector-icons/dist/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {backendUrl, productImageUrl} from '../../constants/app';
import colors from '../../constants/colors';
import Axios from 'axios';
import {setProducts} from '../../actions/products';
const {width} = Dimensions.get('window');
function ProductDetails({navigation, route}) {
  const {product} = route.params;
  const dispatch = useDispatch();
  const userObj = useSelector(state => state.currentUser);
  const [isHidden, setIsHidden] = useState(0);
  const {categories, subCategories, products} = useSelector(
    state => state.products,
  );
  const [isHidding, setIsHidding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsHidden(product.isHidden);
  }, []);

  const handleHide = () => {
    setIsHidding(true);
    Axios.post(backendUrl + '/handleHide', {
      hidden: isHidden == '0' ? '1' : '0',
      email: userObj.email,
      userId: userObj.id,
      productId: product.id,
    })
      .then(res => {
        setIsHidding(false);
        console.log(res.data);
        if (res.data.type == 'success') {
          const prods = [...products];
          for (let i = 0; i < prods.length; i++) {
            if (prods[i].id == product.id) {
              prods[i].isHidden = isHidden == '0' ? '1' : '0';
            }
          }

          isHidden == '0' ? setIsHidden('1') : setIsHidden('0');
          dispatch(setProducts(prods));
        }
        alert(res.data.msg);
      })
      .catch(error => {
        setIsHidding(false);
        alert(error.message);
      });
  };
  const deleteProduct = () => {
    setIsDeleting(true);
    Axios.post(backendUrl + '/deleteProduct', {
      productId: product.id,
      email: userObj.email,
      userId: userObj.id,
    })
      .then(res => {
        alert(res.data.msg);
        dispatch(setProducts(products.filter(p => p.id != product.id)));
        navigation.navigate('Home');
      })
      .catch(error => {
        setIsDeleting(false);
        alert(error.message);
      });
  };
  const handleDelete = () => {
    Alert.alert(
      'Confirm the process',
      'Do you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'confirm',
          onPress: () => {
            deleteProduct();
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {product.images.length > 0 ? (
            <AutoHeightImage
              source={{uri: productImageUrl + product.images[0].name}}
              width={width}
            />
          ) : (
            <Icon name="image" size={width} />
          )}
        </View>
        <View style={{padding: 10}}>
          <Text
            style={{
              fontSize: 20,
              color: colors.APPBAR_HEADER_COLOR,
              textTransform: 'capitalize',
            }}>
            {product.name}
          </Text>
          <Text>{product.description}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <View>
              <Text style={{color: colors.BLACK}}>Category</Text>
              <Text style={{color: colors.GRAY}}>
                {
                  categories.filter(
                    category => category?.id == product?.categoryId,
                  )[0]?.name
                }
              </Text>
            </View>
            <View>
              <Text style={{color: colors.BLACK}}>Sub Category</Text>
              <Text style={{color: colors.GRAY}}>
                {
                  subCategories.filter(
                    category => category?.categoryId == product?.categoryId,
                  )[0]?.name
                }
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <View>
              <Text style={{color: colors.BLACK}}>Price/Unit</Text>
              <Text style={{color: colors.GRAY}}>{product.price} RWF</Text>
            </View>
            <View>
              <Text style={{color: colors.BLACK}}>Availbale Quantity</Text>
              <Text style={{color: colors.GRAY, textAlign: 'center'}}>
                {product.quantity}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Pressable onPress={() => handleHide()} disabled={isHidding}>
              <View
                style={{
                  padding: 10,
                  paddingHorizontal: 25,
                  backgroundColor: colors.APPBAR_HEADER_COLOR,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                {isHidding && (
                  <ActivityIndicator
                    size={25}
                    color="white"
                    style={{marginRight: 10}}
                  />
                )}
                {!isHidding && (
                  <>
                    {isHidden == '0' ? (
                      <Icon2 name="eye-off" color={colors.WHITE} size={35} />
                    ) : (
                      <Icon2 name="eye" color={colors.WHITE} size={35} />
                    )}
                  </>
                )}
                <Text style={{color: colors.WHITE}}>
                  {isHidden == '0' ? 'Hide Product' : 'Make Product visible'}
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('EditProduct', {product})}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Icon2 name="edit-2" size={20} color={colors.BLACK} />
                <Text style={{color: colors.BLACK, marginLeft: 10}}>
                  Edit Product
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={{marginTop: 20}}>
            <Pressable onPress={() => handleDelete()} disabled={isDeleting}>
              <View
                style={{
                  backgroundColor: colors.APPBAR_HEADER_COLOR,
                  padding: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  borderRadius: 10,
                }}>
                {isDeleting ? (
                  <ActivityIndicator size={20} color="white" />
                ) : (
                  <Icon3 name="delete" size={20} color={colors.WHITE} />
                )}
                <Text style={{color: colors.WHITE, marginLeft: 10}}>
                  Delete Product
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default ProductDetails;
