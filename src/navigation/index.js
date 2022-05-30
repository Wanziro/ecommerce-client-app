import 'react-native-gesture-handler';
import React from 'react';
import {Pressable, View, TouchableOpacity} from 'react-native';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import colors from '../constants/colors';
import Toast from 'react-native-toast-message';
import SelectSupplier from '../screens/SelectSupplier';
import {useDispatch, useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome';
import Home from '../screens/Home';
import {fetchSuppliers} from '../actions/suppliers';
import SearchSuppliers from '../screens/SelectSupplier/SearchSuppliers';
import Cart from '../screens/Cart';
import Orders from '../screens/Orders';
import Menu from '../screens/Menu';
import About from '../screens/About';
import Register from '../screens/Register';
import UpdateUserInfo from '../screens/Profile/UpdateUserInfo';
import ChangePassword from '../screens/Profile/ChangePassword';
import DeliveryLocations from '../screens/DeliveryLocations';
import GoogleLocationSearch from '../screens/DeliveryLocations/GoogleLocationSearch';
import OrderSummary from '../screens/OrderSummary';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const HomeTabs = ({navigation}) => {
  const {selectedSupplier} = useSelector(state => state.suppliers);
  const {cart} = useSelector(state => state.cart);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.APPBAR_HEADER_COLOR,
        tabBarInactiveTintColor: colors.GREY_BUNKER,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.WHITE,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({route, navigation}) => ({
          headerShown: true,
          headerTitle: selectedSupplier.companyName,
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Search')}>
              <View style={{paddingRight: 10}}>
                <Icon
                  name="search"
                  color={colors.APPBAR_HEADER_COLOR}
                  size={30}
                />
              </View>
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate('SelectSupplier')}>
              <View style={{paddingLeft: 10}}>
                <Icon
                  name="ios-chevron-back"
                  color={colors.APPBAR_HEADER_COLOR}
                  size={30}
                />
              </View>
            </Pressable>
          ),
          headerTintColor: colors.APPBAR_HEADER_COLOR,
          tabBarItemStyle: {marginBottom: 10},
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="home" color={color} size={size} />;
          },
        })}
      />
      {cart.length > 0 ? (
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: true,
            headerTitle: 'My cart',
            headerTitleAlign: 'center',
            headerTintColor: colors.APPBAR_HEADER_COLOR,
            tabBarItemStyle: {marginBottom: 10},
            tabBarLabelStyle: {fontSize: 14},
            tabBarIcon: ({focused, color, size}) => {
              return <Icon name="cart" color={color} size={size} />;
            },
            tabBarBadge: cart.length,
          }}
        />
      ) : (
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: true,
            headerTitle: 'My cart',
            headerTitleAlign: 'center',
            headerTintColor: colors.APPBAR_HEADER_COLOR,
            tabBarItemStyle: {marginBottom: 10},
            tabBarLabelStyle: {fontSize: 14},
            tabBarIcon: ({focused, color, size}) => {
              return <Icon name="cart" color={color} size={size} />;
            },
          }}
        />
      )}
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          headerTintColor: colors.APPBAR_HEADER_COLOR,
          tabBarItemStyle: {marginBottom: 10},
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({focused, color, size}) => {
            return <Icon2 name="shopping-bag" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          headerTintColor: colors.APPBAR_HEADER_COLOR,
          tabBarItemStyle: {marginBottom: 10},
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="menu" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

function index() {
  const dispatch = useDispatch();
  const {selectedSupplier} = useSelector(state => state.suppliers);
  return (
    <>
      <StatusBar backgroundColor={colors.WHITE} barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            selectedSupplier === null ? 'SelectSupplier' : 'HomeTabs1'
          }>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTransparent: true,
              title: '',
              headerShadowVisible: false,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerTransparent: true,
              title: '',
              headerShadowVisible: false,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="UpdateUserInfo"
            component={UpdateUserInfo}
            options={{
              title: 'Update user info',
              headerStyle: {backgroundColor: colors.APPBAR_HEADER_COLOR},
              headerTintColor: colors.WHITE,
            }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
              title: 'Change password',
              headerStyle: {backgroundColor: colors.APPBAR_HEADER_COLOR},
              headerTintColor: colors.WHITE,
            }}
          />
          <Stack.Screen
            name="DeliveryLocations"
            component={DeliveryLocations}
            options={{
              title: 'Delivery Location',
              headerStyle: {backgroundColor: colors.APPBAR_HEADER_COLOR},
              headerTintColor: colors.WHITE,
            }}
          />
          <Stack.Screen
            name="OrderSummary"
            component={OrderSummary}
            options={{
              title: 'Order summary',
              headerStyle: {backgroundColor: colors.APPBAR_HEADER_COLOR},
              headerTintColor: colors.WHITE,
            }}
          />
          <Stack.Screen
            name="SearchLocation"
            component={GoogleLocationSearch}
            options={{
              title: 'Search for locations',
              headerStyle: {backgroundColor: colors.APPBAR_HEADER_COLOR},
              headerTintColor: colors.WHITE,
            }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              title: 'About Cyizere App',
              headerStyle: {backgroundColor: colors.APPBAR_HEADER_COLOR},
              headerTintColor: colors.WHITE,
            }}
          />
          <Stack.Screen
            name="HomeTabs1"
            component={HomeTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SearchSuppliers"
            component={SearchSuppliers}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SelectSupplier"
            component={SelectSupplier}
            options={({route, navigation}) => ({
              title: 'Choose Cyizere Supplier',
              headerBackVisible: false,
              headerTitleAlign: 'left',
              headerRight: () => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: 90,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SearchSuppliers')}>
                    <Icon name="search" size={30} color={colors.BLACK} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => dispatch(fetchSuppliers())}>
                    <Icon name="ios-refresh" size={30} color={colors.BLACK} />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default index;
