import React, {useEffect} from 'react';
import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSuppliers, setSelectedSupplier} from '../../actions/suppliers';
import colors from '../../constants/colors';
import PlaceHolder from './PlaceHolder';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {resetCart} from '../../actions/cart';

function SelectSupplier({navigation}) {
  const dispatch = useDispatch();
  const {isLoading, supplierError, suppliers} = useSelector(
    state => state.suppliers,
  );
  useEffect(() => {
    dispatch(fetchSuppliers());
  }, []);
  return (
    <>
      <StatusBar backgroundColor={colors.WHITE} barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND_COLOR,
          padding: 10,
        }}>
        {isLoading ? (
          <PlaceHolder />
        ) : (
          <>
            {suppliers.length > 0 ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                {suppliers.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      dispatch(setSelectedSupplier(item));
                      dispatch(resetCart());
                      navigation.replace('HomeTabs1');
                    }}>
                    <View
                      style={{
                        marginVertical: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        backgroundColor: colors.WHITE,
                        padding: 10,
                        borderRadius: 10,
                      }}>
                      <Icon name="store" size={50} color={colors.BLACK} />
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
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'center',
                }}>
                {Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2:
                    supplierError !== '' ? supplierError : 'No suppliers found',
                  position: 'bottom',
                  autoHide: false,
                })}
                {supplierError !== '' ? (
                  <Text style={{color: colors.APPBAR_HEADER_COLOR}}>
                    {supplierError}
                  </Text>
                ) : (
                  <>
                    <Text>No suppliers found</Text>
                  </>
                )}
              </View>
            )}
          </>
        )}
      </View>
    </>
  );
}

export default SelectSupplier;
