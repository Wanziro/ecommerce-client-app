import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  SafeAreaView,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/dist/EvilIcons';
import {useSelector} from 'react-redux';
import {productImageUrl} from '../../constants/app';
import colors from '../../constants/colors';
const {height, width} = Dimensions.get('window');
function Search({navigation}) {
  const {products} = useSelector(state => state.products);
  const [keyWord, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const keyWordRef = useRef(null);
  useEffect(() => {
    keyWordRef.current.focus();
    setResults([...products]);
  }, []);

  const handleSearch = key => {
    setKeyword(key);
    if (key.trim() !== '') {
      const res = [];
      for (let i = 0; i < products.length; i++) {
        const n = products[i].name.toLowerCase();
        if (n.includes(key.toLowerCase())) {
          res.push(products[i]);
        }
      }
      setResults(res);
    } else {
      setResults([...products]);
    }
  };
  return (
    <>
      <StatusBar backgroundColor={colors.WHITE} barStyle="dark-content" />
      <SafeAreaView>
        <View style={{height, width, backgroundColor: colors.WHITE}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Pressable onPress={() => navigation.navigate('Home')}>
              <View>
                <Icon name="chevron-back" size={40} color={colors.BLACK} />
              </View>
            </Pressable>
            <View style={{flex: 1, paddingHorizontal: 10}}>
              <TextInput
                style={{
                  backgroundColor: colors.WHITE,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderBottomColor: colors.GREY,
                  borderBottomWidth: 1,
                  width: '100%',
                }}
                onChangeText={text => handleSearch(text)}
                ref={keyWordRef}
                placeholder="Search for product by name"
              />
            </View>
          </View>
          <ScrollView>
            <View style={{padding: 10, marginTop: 10}}>
              {results.length > 0 ? (
                <>
                  <Text style={{marginBottom: 10}}>
                    Search results for {keyWord}
                  </Text>
                  {results.map((product, i) => (
                    <Pressable
                      key={i}
                      onPress={() =>
                        navigation.navigate('ProductDetails', {product})
                      }>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          marginVertical: 10,
                        }}>
                        {product.images.length > 0 ? (
                          <Image
                            source={{
                              uri: productImageUrl + product.images[0].name,
                            }}
                            style={{borderRadius: 10, width: 80, height: 80}}
                          />
                        ) : (
                          <Icon2 name="image" size={width / 2 - 30} />
                        )}
                        <View style={{flex: 1, paddingLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: colors.BLACK,
                            }}>
                            {product.name}
                          </Text>
                          <Text>Price {product.price} RWF</Text>
                          <Text
                            style={{
                              color: colors.GREY_CHATEAU,
                            }}>
                            Status:{' '}
                            {product.isHidden == '0' ? 'Visible' : 'Hidden'}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </>
              ) : (
                <Text>No results found</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Search;
