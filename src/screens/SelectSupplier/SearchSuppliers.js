import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import {setSelectedSupplier} from '../../actions/suppliers';
function SearchSuppliers({navigation}) {
  const dispatch = useDispatch();
  const {suppliers} = useSelector(state => state.suppliers);
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSearch = key => {
    setInput(key);
    if (key.trim() !== '') {
      const res = [];
      for (let i = 0; i < suppliers.length; i++) {
        const n = suppliers[i].companyName.toLowerCase();
        const n2 = suppliers[i].address.toLowerCase();
        if (n.includes(key.toLowerCase()) || n2.includes(key.toLowerCase())) {
          res.push(suppliers[i]);
        }
      }
      setResults(res);
    } else {
      setResults([...suppliers]);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <View
        style={{
          paddingHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('SelectSupplier')}>
          <Icon name="ios-chevron-back" size={25} color={colors.BLACK} />
        </TouchableOpacity>
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
            ref={inputRef}
            placeholder="Search by supplier name or address"
          />
        </View>
      </View>
      <View style={{padding: 10}}>
        {input.trim() !== '' && (
          <Text style={{paddingHorizontal: 10, color: colors.GREY_CHATEAU}}>
            Found {results.length} search results for {input}
          </Text>
        )}
        {results.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {results.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  dispatch(setSelectedSupplier(item));
                  navigation.replace('HomeTabs1');
                }}>
                <View
                  style={{
                    marginVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    backgroundColor: colors.WHITE,

                    borderRadius: 10,
                  }}>
                  <Icon2 name="store" size={50} color={colors.BLACK} />
                  <View style={{flex: 1, marginLeft: 10}}>
                    <Text
                      style={{
                        color: colors.BLACK,
                        fontSize: 18,
                        textTransform: 'capitalize',
                      }}>
                      {item.companyName}
                    </Text>
                    <Text
                      style={{
                        color: colors.GRAY,
                        textTransform: 'capitalize',
                      }}>
                      {item.address}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {input.trim() === '' ? (
              <Icon name="search" size={100} color={colors.GAINSBORO} />
            ) : (
              <View>
                <Icon name="search" size={100} color={colors.GAINSBORO} />
                <Text>No results found</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

export default SearchSuppliers;
