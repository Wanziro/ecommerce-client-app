import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import colors from '../../constants/colors';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';
import {backendUrl} from '../../constants/app';
import {uploadProductImage} from '../../helpers/fileUploads';
import {useLoadBasicData} from '../../helpers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {width, height} = Dimensions.get('window');
function AddProduct({navigation}) {
  const userObj = useSelector(state => state.currentUser);
  const loadBasicData = useLoadBasicData();
  const {categories, subCategories} = useSelector(state => state.products);
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadBasicData();
  }, []);

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 320,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        console.log(image);
        setImage(image);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSave = () => {
    setShowModal(true);
    if (
      categoryId.trim() == '' ||
      productName.trim() === '' ||
      quantity.trim() === '' ||
      price.trim() === '' || description.trim() === ""||
      image === null
    ) {
      setShowModal(false);
      alert('Please fill in all product information');
    } else {
      Axios.post(backendUrl + '/saveProduct', {
        productName,
        categoryId,
        subCategoryId,
        quantity,description,
        price,
        email: userObj.email,
        userId: userObj.id,
      })
        .then(res => {
          // console.log(res.data);
          setShowModal(false);
          if (res.data.type == 'success') {
            uploadProductImage(image, res.data.productId)
              .then(res => {
                loadBasicData();
                setProductName('');
                setCategoryId('');
                setSubCategoryId('');
                setQuantity('');
                setPrice('');
                setImage(null);
                navigation.navigate('Home');
              })
              .catch(error => {
                loadBasicData();
                setProductName('');
                setDescription('')
                setCategoryId('');
                setSubCategoryId('');
                setQuantity('');
                setPrice('');
                setImage(null);
                navigation.navigate('Home');
              });
          } else {
            alert(res.data.msg);
            setProductName('');
            setCategoryId('');
            setSubCategoryId('');
            setQuantity('');
            setPrice('');setDescription('')
            setImage(null);
          }
        })
        .catch(error => {
          console.log(error);
          setShowModal(false);
          alert(error.message);
        });
    }
  };

  return (
    <KeyboardAwareScrollView>
        <StatusBar backgroundColor={colors.WHITE} barStyle="dark-content" />
      <SafeAreaView>
        <View style={{height:'100%', width, backgroundColor: colors.BACKGROUND_COLOR,}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{padding: 10, paddingBottom: 50}}>
              <View style={{marginVertical: 10}}>
                <Text style={{marginBottom: 5, color: colors.BLACK}}>
                  Product name
                </Text>
                <TextInput
                  placeholder="Name of the product"
                  style={styles.input}
                  value={productName}
                  onChangeText={text => setProductName(text)}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text style={{marginBottom: 5, color: colors.BLACK}}>
                  Category
                </Text>
                <Picker
                  selectedValue={categoryId}
                  onValueChange={(itemValue, itemIndex) =>
                    setCategoryId(itemValue)
                  }
                  style={styles.input}>
                  {[{name: 'Choose category', id: ''}, ...categories].map(
                    (category, i) => (
                      <Picker.Item
                        key={i}
                        label={category.name}
                        value={category.id}
                      />
                    ),
                  )}
                </Picker>
              </View>
              <View style={{marginVertical: 10}}>
                <Text style={{marginBottom: 5, color: colors.BLACK}}>
                  sub category (optional)
                </Text>
                <Picker
                  selectedValue={subCategoryId}
                  onValueChange={(itemValue, itemIndex) =>
                    setSubCategoryId(itemValue)
                  }
                  style={styles.input}>
                  {[
                    {name: 'Choose', id: ''},
                    ...subCategories.filter(
                      subCat => subCat.categoryId == categoryId,
                    ),
                  ].map((category, i) => (
                    <Picker.Item
                      key={i}
                      label={category.name}
                      value={category.id}
                    />
                  ))}
                </Picker>
              </View>
              <View style={{marginVertical: 10}}>
                <Text style={{marginBottom: 5, color: colors.BLACK}}>
                  Quantity
                </Text>
                <TextInput
                  placeholder="How many items do you have?"
                  style={styles.input}
                  keyboardType="number-pad"
                  value={quantity}
                  onChangeText={text => setQuantity(text)}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text style={{marginBottom: 5, color: colors.BLACK}}>
                  Price per item (RWF)
                </Text>
                <TextInput
                  placeholder="Enter the price"
                  style={styles.input}
                  keyboardType="number-pad"
                  value={price}
                  onChangeText={text => setPrice(text)}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Text style={{marginBottom: 5, color: colors.BLACK}}>
                  Description
                </Text>
                <TextInput
                  placeholder="Say something about your product"
                  style={{...styles.input,minHeight:100,maxHeight:150,textAlignVertical:'top'}}
                  value={description}
                  onChangeText={text => setDescription(text)}
                  maxLength={200}
                  multiline={true}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <Pressable onPress={() => selectImage()}>
                  <View
                    style={{
                      backgroundColor: colors.GAINSBORO,
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <Text style={{marginBottom: 5, color: colors.BLACK}}>
                      {image !== null
                        ? 'Image selected. Click to replace it'
                        : ' Select Product Image'}
                    </Text>
                  </View>
                </Pressable>
              </View>
              {!showModal && (
                <Pressable onPress={() => handleSave()}>
                  <View
                    style={{
                      padding: 15,
                      backgroundColor: colors.APPBAR_HEADER_COLOR,
                      marginTop: 10,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        color: colors.WHITE,
                        textAlign: 'center',
                        fontSize: 18,
                      }}>
                      Save Product
                    </Text>
                  </View>
                </Pressable>
              )}
            </View>
          </ScrollView>
        </View>

        <Modal visible={showModal} transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator color={colors.WHITE} size={50} />
            <Text style={{color: colors.WHITE, marginTop: 10}}>
              Saving product...
            </Text>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderColor: colors.BORDER_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.WHITE,
  },
});

export default AddProduct;
