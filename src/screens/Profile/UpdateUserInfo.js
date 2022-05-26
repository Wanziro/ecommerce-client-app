import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import colors from '../../constants/colors';
import {Picker} from '@react-native-picker/picker';
import Axios from 'axios';
import {backendUrl} from '../../constants/app';
import {
  setCurrentUserAddress,
  setCurrentUserNames,
  setCurrentUserPhone,
} from '../../actions/currentUser';
import {useDispatch, useSelector} from 'react-redux';

const {width} = Dimensions.get('window');
function UpdateUserInfo({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [names, setNames] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const validPhoneCode = ['8', '9', '2', '3'];

  const handleSubmit = () => {
    if (
      !validPhoneCode.includes(phone[2]) ||
      phone[0] !== '0' ||
      phone[1] !== '7' ||
      phone.length !== 10
    ) {
      alert('Invalid phone number');
    } else if (
      names.trim() !== '' &&
      address.trim() != '' &&
      phone.trim() != ''
    ) {
      setIsSubmitting(true);
      Axios.post(backendUrl + '/updateUserInformation', {
        names,
        address,
        email: user.email,
        userId: user.id,
        phone,
      })
        .then(res => {
          setIsSubmitting(false);
          console.log(res.data);
          if (res.data.type === 'success') {
            dispatch(setCurrentUserNames(names));
            dispatch(setCurrentUserAddress(address));
            dispatch(setCurrentUserPhone(phone));
            navigation.navigate('Menu');
          } else {
            alert(res.data.msg);
          }
        })
        .catch(error => {
          setIsSubmitting(false);
          console.log(error.message);
        });
    } else {
      alert('All fields are required');
    }
  };
  return (
    <>
      <StatusBar backgroundColor={colors.APPBAR_HEADER_COLOR} />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND_COLOR,
          padding: 10,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginVertical: 10}}>
            <Text style={styles.label}>Names</Text>
            <TextInput
              style={styles.input}
              value={names}
              onChangeText={text => setNames(text)}
            />
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={styles.label}>Phone number (07....)</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={text => setPhone(text)}
              maxLength={10}
            />
          </View>

          <View style={{marginVertical: 10}}>
            <View style={{marginVertical: 10}}>
              <Pressable onPress={() => handleSubmit()} disabled={isSubmitting}>
                <View
                  style={{
                    padding: 15,
                    borderRadius: 5,
                    backgroundColor: colors.APPBAR_HEADER_COLOR,
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  {isSubmitting && (
                    <ActivityIndicator color={colors.WHITE} size={25} />
                  )}
                  <Text
                    style={{
                      textAlign: 'center',
                      color: colors.WHITE,
                      fontSize: 16,
                    }}>
                    Submit info
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
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
  label: {
    color: colors.MENU,
    marginBottom: 5,
  },
});

export default UpdateUserInfo;
