import React from 'react';
import {View, Text, Dimensions, TouchableOpacity, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';
import {resetCurrentUser} from '../../actions/currentUser';
import {resetCart} from '../../actions/cart';
const {width, height} = Dimensions.get('window');
function Menu({navigation}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);
  const handleLogout = () => {
    Alert.alert(
      'Confirmation',
      'Do you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'confirm',
          onPress: () => {
            dispatch(resetCurrentUser());
            dispatch(resetCart());
            navigation.navigate('Login');
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.APPBAR_HEADER_COLOR}}>
      <View
        style={{
          backgroundColor: colors.WHITE,
          height: height / 2 - 100,
          borderBottomRightRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}>
        <Icon name="user-alt" size={100} color={colors.APPBAR_HEADER_COLOR} />
        <View style={{marginTop: 10, alignItems: 'center'}}>
          {currentUser.id === '' ? (
            <>
              <Text style={{fontSize: 20, color: colors.BLACK}}>
                Guest user
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  color: colors.BLACK,
                  fontSize: 20,
                  textTransform: 'capitalize',
                  marginBottom: 10,
                }}>
                {currentUser.name}
              </Text>
              <Text
                style={{
                  color: colors.BLACK,
                }}>
                {currentUser.email}
              </Text>
            </>
          )}
        </View>
      </View>
      <View style={{paddingVertical: 10, paddingHorizontal: 20, marginTop: 10}}>
        {currentUser.id !== '' && (
          <>
            <Text
              style={{
                color: colors.BLACK,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Phone: {currentUser.phone}
            </Text>
            <Text
              style={{
                color: colors.BLACK,
                fontWeight: 'bold',
                fontSize: 16,
                marginBottom: 15,
              }}>
              Address: {currentUser.address}
            </Text>
            <TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginBottom: 15,
                }}>
                <Icon name="user-edit" size={25} color={colors.BLACK} />
                <Text
                  style={{
                    color: colors.BLACK,
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginLeft: 10,
                    flex: 1,
                  }}>
                  Update user info
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginBottom: 15,
                }}>
                <Icon3 name="lock" size={25} color={colors.BLACK} />
                <Text
                  style={{
                    color: colors.BLACK,
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginLeft: 10,
                    flex: 1,
                  }}>
                  Change password
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginBottom: 15,
            }}>
            <Icon2 name="infocirlceo" size={25} color={colors.BLACK} />
            <Text
              style={{
                color: colors.BLACK,
                fontWeight: 'bold',
                fontSize: 16,
                marginLeft: 10,
                flex: 1,
              }}>
              About the app
            </Text>
          </View>
        </TouchableOpacity>
        {currentUser.id !== '' ? (
          <TouchableOpacity onPress={() => handleLogout()}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginBottom: 15,
              }}>
              <Icon2 name="logout" size={25} color={colors.BLACK} />
              <Text
                style={{
                  color: colors.BLACK,
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginLeft: 10,
                  flex: 1,
                }}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginBottom: 15,
                }}>
                <Icon2 name="adduser" size={25} color={colors.BLACK} />
                <Text
                  style={{
                    color: colors.BLACK,
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginLeft: 10,
                    flex: 1,
                  }}>
                  Register
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginBottom: 15,
                }}>
                <Icon2 name="login" size={25} color={colors.BLACK} />
                <Text
                  style={{
                    color: colors.BLACK,
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginLeft: 10,
                    flex: 1,
                  }}>
                  Login
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

export default Menu;
