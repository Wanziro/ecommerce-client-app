import React, {useRef, useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
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
function Login() {
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
        backgroundColor={colors.BACKGROUND_COLOR}
        barStyle="dark-content"
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.BACKGROUND_COLOR,
          paddingHorizontal: 15,
        }}>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.BLACK}}>
            Supplier App
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.APPBAR_HEADER_COLOR,
              marginTop: 30,
              textAlign: 'center',
            }}>
            Login
          </Text>
        </View>
        <View style={{width: '90%', marginTop: 40}}>
          <View style={{marginVertical: 10}}>
            <Text style={{color: colors.FOOTER_BODY_TEXT_COLOR}}>
              Email address
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
              placeholder="example@gmail.com"
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
                  Login
                </Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Login;
