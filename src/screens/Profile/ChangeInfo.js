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
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';
import {backendUrl} from '../../constants/app';
import {
  setCurrentUserAddress,
  setCurrentUserClose,
  setCurrentUserCompanyName,
  setCurrentUserNames,
  setCurrentUserPhone,
  setCurrentUserStart,
} from '../../actions/currentUser';

const {width} = Dimensions.get('window');
function ChangeInfo({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser);
  const [openingHours, setOpeningHours] = useState(user.start.split(' ')[1]);
  const [closingHours, setClosingHours] = useState(user.close.split(' ')[1]);
  const [openingHoursName, setOpeningHoursName] = useState(
    user.start.split(' ')[0],
  );
  const [closingHoursName, setClosingHoursName] = useState(
    user.close.split(' ')[0],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [names, setNames] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [companyName, setCompanyName] = useState(user.companyName);
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
      openingHoursName.trim() !== '' &&
      closingHoursName.trim() !== '' &&
      names.trim() !== '' &&
      companyName.trim() !== '' &&
      address.trim() != '' &&
      phone.trim() != ''
    ) {
      setIsSubmitting(true);
      Axios.post(backendUrl + '/updateUserInformation', {
        openingHours: openingHoursName + ' ' + openingHours,
        closingHours: closingHoursName + ' ' + closingHours,
        ownerName: names,
        address,
        companyName,
        email: user.email,
        userId: user.id,
        phone,
      })
        .then(res => {
          setIsSubmitting(false);
          console.log(res.data);
          if ((res.data.type = 'success')) {
            alert(res.data.msg);
            dispatch(setCurrentUserNames(names));
            dispatch(setCurrentUserCompanyName(companyName));
            dispatch(setCurrentUserAddress(address));
            dispatch(setCurrentUserPhone(phone));
            dispatch(
              setCurrentUserStart(openingHoursName + ' ' + openingHours),
            );
            dispatch(
              setCurrentUserClose(closingHoursName + ' ' + closingHours),
            );
            navigation.navigate('Account');
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
    <View
      style={{flex: 1, backgroundColor: colors.BACKGROUND_COLOR, padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: 10}}>
          <Text style={styles.label}>Owner names</Text>
          <TextInput
            style={styles.input}
            value={names}
            onChangeText={text => setNames(text)}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={styles.label}>Company name</Text>
          <TextInput
            style={styles.input}
            value={companyName}
            onChangeText={text => setCompanyName(text)}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={styles.label}>Company address</Text>
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
          <Text style={styles.label}>Opening hours (ex: 6:00)</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{width: width / 2}}>
              <TextInput
                style={styles.input}
                value={openingHoursName}
                onChangeText={text => setOpeningHoursName(text)}
              />
            </View>
            <View>
              <Picker
                selectedValue={openingHours}
                onValueChange={(itemValue, itemIndex) =>
                  setOpeningHours(itemValue)
                }
                style={{
                  ...styles.input,
                  width: width / 2 - 30,
                  marginLeft: 15,
                }}>
                <Picker.Item label="AM" value="AM" />
                <Picker.Item label="PM" value="PM" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={styles.label}>Closing hours (ex: 7:30)</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{width: width / 2}}>
              <TextInput
                style={styles.input}
                value={closingHoursName}
                onChangeText={text => setClosingHoursName(text)}
              />
            </View>
            <View>
              <Picker
                selectedValue={closingHours}
                onValueChange={(itemValue, itemIndex) =>
                  setClosingHours(itemValue)
                }
                style={{
                  ...styles.input,
                  width: width / 2 - 30,
                  marginLeft: 15,
                }}>
                <Picker.Item label="AM" value="AM" />
                <Picker.Item label="PM" value="PM" />
              </Picker>
            </View>
          </View>
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

export default ChangeInfo;
