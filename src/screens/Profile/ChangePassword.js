import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import colors from '../../constants/colors';
import Axios from 'axios';
import {backendUrl} from '../../constants/app';
import {useSelector} from 'react-redux';

function ChangePassword({navigation}) {
  const userObj = useSelector(state => state.currentUser);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const newPasswordRef = useRef(null);

  const handleSubmit = () => {
    if (
      newPassword.trim() === '' &&
      currentPassword.trim() === '' &&
      confirmPassword.trim() === ''
    ) {
      alert('All fields are required');
    } else if (newPassword.length <= 4) {
      alert('Password must be more than 4 characters');
      newPasswordRef.current.focus();
    } else if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      setIsSubmitting(true);
      Axios.post(backendUrl + '/updatePassword', {
        userId: userObj.id,
        email: userObj.email,
        currentPassword,
        newPassword,
      })
        .then(res => {
          setIsSubmitting(false);
          if (res.data.type == 'success') {
            alert(res.data.msg);
            navigation.navigate('Home');
          } else {
            alert(res.data.msg);
          }
        })
        .catch(error => console.log(error.message));
    }
  };
  return (
    <>
      <StatusBar backgroundColor={colors.WHITE} barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND_COLOR,
          padding: 15,
        }}>
        <TextInput
          style={{
            backgroundColor: colors.WHITE,
            padding: 10,
            borderRadius: 5,
            borderColor: colors.BORDER_COLOR,
            borderWidth: 1,
            marginVertical: 10,
          }}
          placeholder="Current password"
          secureTextEntry
          onChangeText={text => setCurrentPassword(text)}
        />
        <TextInput
          style={{
            backgroundColor: colors.WHITE,
            padding: 10,
            borderRadius: 5,
            borderColor: colors.BORDER_COLOR,
            borderWidth: 1,
            marginVertical: 10,
          }}
          placeholder="New password"
          secureTextEntry
          ref={newPasswordRef}
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
        />
        <TextInput
          style={{
            backgroundColor: colors.WHITE,
            padding: 10,
            borderRadius: 5,
            borderColor: colors.BORDER_COLOR,
            borderWidth: 1,
            marginVertical: 10,
          }}
          placeholder="New password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        <Pressable onPress={() => handleSubmit()} disabled={isSubmitting}>
          <View
            style={{
              backgroundColor: colors.APPBAR_HEADER_COLOR,
              padding: 15,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            {isSubmitting && (
              <ActivityIndicator color={colors.WHITE} size={20} />
            )}
            <Text style={{color: colors.WHITE, textAlign: 'center'}}>
              Update password
            </Text>
          </View>
        </Pressable>
      </View>
    </>
  );
}

export default ChangePassword;
