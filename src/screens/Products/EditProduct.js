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
} from 'react-native';
import {useSelector} from 'react-redux';
import {backendUrl} from '../../constants/app';
import colors from '../../constants/colors';
import {useLoadBasicData} from '../../helpers';
import {Picker} from '@react-native-picker/picker';
import Axios from 'axios';

function EditProduct({navigation, route}) {
  const {product} = route.params;
  const userObj = useSelector(state => state.currentUser);
  const loadBasicData = useLoadBasicData();
  const {categories, subCategories} = useSelector(state => state.products);
  const [categoryId, setCategoryId] = useState(product.categoryId);
  const [subCategoryId, setSubCategoryId] = useState(product.subCategoryId);
  const [productName, setProductName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadBasicData();
  }, []);

  const handleSave = () => {
    setShowModal(true);
    if (
      categoryId.trim() == '' ||
      productName.trim() === '' ||
      quantity.trim() === '' ||
      price.trim() === '' || description.trim() === ""
    ) {
      setShowModal(false);
      alert('Please fill in all product information');
    } else {
      Axios.post(backendUrl + '/updateProduct', {
        productId: product.id,
        productName,
        categoryId,description,
        subCategoryId,
        quantity,
        price,
        email: userObj.email,
        userId: userObj.id,
      })
        .then(res => {
          console.log(res.data);
          setShowModal(false);
          if (res.data.type == 'success') {
            loadBasicData();
            navigation.navigate('Home');
          } else {
            alert(res.data.msg);
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
    <View style={{backgroundColor: colors.BACKGROUND_COLOR, flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 15}}>
          <View style={{padding: 10}}>
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
                {categories.map((category, i) => (
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
                sub category (optional)
              </Text>
              <Picker
                selectedValue={subCategoryId}
                onValueChange={(itemValue, itemIndex) =>
                  setSubCategoryId(itemValue)
                }
                style={styles.input}>
                {[
                  ...subCategories.filter(
                    subCat => subCat.categoryId == categoryId,
                  ),
                ].length > 0 &&
                  [
                    {name: 'Choose subcategory', id: ''},
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
                    Update Product
                  </Text>
                </View>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
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
            Updating your product...
          </Text>
        </View>
      </Modal>
    </View>
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

export default EditProduct;
