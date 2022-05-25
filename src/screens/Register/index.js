import React, {useRef, useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../constants/colors';
import Axios from 'axios';
import {backendUrl} from '../../constants/app';
import {useDispatch} from 'react-redux';
import {
  setCurrentUserAddress,
  setCurrentUserClose,
  setCurrentUserCompanyName,
  setCurrentUserEmail,
  setCurrentUserId,
  setCurrentUserNames,
  setCurrentUserPhone,
  setCurrentUserStart,
} from '../../actions/currentUser';
const {width} = Dimensions.get('window');
function Register({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const emailRef = useRef(null);
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = () => {
    setIsSubmitting(true);
    if (email.trim() === '' || password.trim() === '') {
      emailRef.current.focus();
      setIsSubmitting(false);
    } else {
      Axios.post(backendUrl + '/login', {email, password})
        .then(res => {
          console.log(res.data);
          if (res.data.type == 'success') {
            const {id, name, companyName, phone, email, address, start, close} =
              res.data.user;
            dispatch(setCurrentUserNames(name));
            dispatch(setCurrentUserCompanyName(companyName));
            dispatch(setCurrentUserAddress(address));
            dispatch(setCurrentUserStart(start));
            dispatch(setCurrentUserClose(close));
            dispatch(setCurrentUserPhone(phone));
            dispatch(setCurrentUserEmail(email));
            dispatch(setCurrentUserId(id));
          } else {
            setPassword('');
            alert(res.data.msg);
            setIsSubmitting(false);
          }
        })
        .catch(error => {
          setIsSubmitting(false);
          setPassword('');
          alert(error.message);
        });
    }
  };

  return (
    <KeyboardAwareScrollView>
      <StatusBar
        backgroundColor={colors.APPBAR_HEADER_COLOR}
        barStyle="dark-content"
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.BACKGROUND_COLOR,
        }}>
        <View
          style={{
            backgroundColor: colors.APPBAR_HEADER_COLOR,
            padding: 10,
            height: 50,
            width: '100%',
            borderBottomEndRadius: 80,
            // borderBottomStartRadius: 80,
            position: 'relative',
          }}>
          <View style={{position: 'absolute', bottom: -70, width}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  backgroundColor: colors.BACKGROUND_COLOR,
                  borderRadius: 100,
                  padding: 10,
                }}>
                <Image
                  source={require('../../../assets/logo.png')}
                  style={{width: 100, height: 100}}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{width: '90%', marginTop: 40}}>
          <View style={{marginVertical: 10}}>
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>Names</Text>
            <TextInput
              style={{
                backgroundColor: colors.WHITE,
                marginTop: 10,
                borderRadius: 5,
                padding: 10,
                borderWidth: 1,
                borderColor: colors.BORDER_COLOR,
              }}
              placeholder="Phone or email address"
              onChangeText={text => setEmail(text)}
              ref={emailRef}
              value={email}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>Phone</Text>
            <TextInput
              style={{
                backgroundColor: colors.WHITE,
                marginTop: 10,
                borderRadius: 5,
                padding: 10,
                borderWidth: 1,
                borderColor: colors.BORDER_COLOR,
              }}
              placeholder="Phone or email address"
              onChangeText={text => setEmail(text)}
              ref={emailRef}
              value={email}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>Email</Text>
            <TextInput
              style={{
                backgroundColor: colors.WHITE,
                marginTop: 10,
                borderRadius: 5,
                padding: 10,
                borderWidth: 1,
                borderColor: colors.BORDER_COLOR,
              }}
              placeholder="Phone or email address"
              onChangeText={text => setEmail(text)}
              ref={emailRef}
              value={email}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>Password</Text>
            <TextInput
              style={{
                backgroundColor: colors.WHITE,
                marginTop: 10,
                borderRadius: 5,
                padding: 10,
                borderWidth: 1,
                borderColor: colors.BORDER_COLOR,
              }}
              secureTextEntry
              placeholder="Enter your password"
              onChangeText={text => setPassword(text)}
              value={password}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>
              Confirm password
            </Text>
            <TextInput
              style={{
                backgroundColor: colors.WHITE,
                marginTop: 10,
                borderRadius: 5,
                padding: 10,
                borderWidth: 1,
                borderColor: colors.BORDER_COLOR,
              }}
              secureTextEntry
              placeholder="Enter your password"
              onChangeText={text => setPassword(text)}
              value={password}
            />
          </View>
          {isSubmitting ? (
            <View
              style={{
                backgroundColor: colors.APPBAR_HEADER_COLOR,
                padding: 15,
                marginTop: 10,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <ActivityIndicator color={colors.WHITE} />
              <Text
                style={{
                  color: colors.WHITE,
                  textAlign: 'center',
                  fontSize: 18,
                  marginLeft: 10,
                }}>
                Login
              </Text>
            </View>
          ) : (
            <Pressable onPress={() => handleSubmit()}>
              <View
                style={{
                  backgroundColor: colors.APPBAR_HEADER_COLOR,
                  padding: 15,
                  marginTop: 10,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    color: colors.WHITE,
                    textAlign: 'center',
                    fontSize: 18,
                  }}>
                  Register
                </Text>
              </View>
            </Pressable>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={{marginTop: 20}}>
              <Text style={{textAlign: 'center', color: colors.OXFORD_BLUE}}>
                Already have account? Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Register;
