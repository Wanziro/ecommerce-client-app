import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import colors from '../../constants/colors';
import PlaceHolder from './PlaceHolder';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import {backendUrl} from '../../constants/app';
import OrderItem from './OrderItem';
function SuccessfullOrders() {
  const {email, id} = useSelector(state => state.currentUser);
  const [orders, setOrders] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const loadData = () => {
    if (orders.length === 0) {
      setLoading(true);
    }
    setErrorMessage('');
    Axios.post(backendUrl + '/getSuccessfullOrders', {
      email,
      userId: id,
    })
      .then(res => {
        if (isActive) {
          setLoading(false);
          if (res.data.type == 'success') {
            setOrders(res.data.orders);
          } else {
            setOrders([]);
          }
        }
      })
      .catch(error => {
        console.log(error);
        if (isActive) {
          setLoading(false);
          if (orders.length === 0) {
            setErrorMessage(error.message);
          }
        }
      });
  };

  const loadData2 = () => {
    setErrorMessage('');
    Axios.post(backendUrl + '/getSuccessfullOrders', {
      email,
      userId: id,
    })
      .then(res => {
        if (isActive) {
          setLoading(false);
          if (res.data.type == 'success') {
            setOrders(res.data.orders);
          } else {
            setOrders([]);
          }
        }
      })
      .catch(error => {
        console.log(error);
        if (isActive) {
          setLoading(false);
          if (orders.length === 0) {
            setErrorMessage(error.message);
            alert(error.message);
          }
        }
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      let sub = true;
      //
      setIsActive(true);
      loadData();
      //
      return () => {
        sub = false;
        setIsActive(false);
      };
    }, []),
  );
  return (
    <View
      style={{flex: 1, backgroundColor: colors.BACKGROUND_COLOR, padding: 10}}>
      {loading ? (
        <PlaceHolder />
      ) : (
        <>
          {orders.length > 0 ? (
            <View>
              <FlatList
                data={orders}
                showsVerticalScrollIndicator={false}
                renderItem={(item, index) => <OrderItem item={item} />}
                style={{padding: 10}}
                refreshing={false}
                onRefresh={() => loadData2()}
              />
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="ios-sad-outline" size={70} colors={colors.GREY} />
              <Text style={{marginTop: 15, color: colors.GREY}}>
                {errorMessage === ''
                  ? 'No completed orders found'
                  : errorMessage}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

export default SuccessfullOrders;
