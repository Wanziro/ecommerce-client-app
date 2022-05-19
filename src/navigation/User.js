import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon2 from 'react-native-vector-icons/dist/Octicons';

import Home from '../screens/Home';
import colors from '../constants/colors';
import Orders from '../screens/Orders';
import AddProduct from '../screens/Products/AddProduct';
import Profile from '../screens/Profile';
import ProductDetails from '../screens/Products/ProductDetails';
import EditProduct from '../screens/Products/EditProduct';
import ChangePassword from '../screens/Profile/ChangePassword';
import ChangeInfo from '../screens/Profile/ChangeInfo';
import Search from '../screens/Home/Search';
import CancelledOrders from '../screens/Orders/CancelledOrders';
import SuccessfullOrders from '../screens/Orders/SuccessfullOrders';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function OrderTabs() {
  return (
    <TopTab.Navigator
      initialRouteName="PendingOrders"
      screenOptions={{
        tabBarActiveTintColor: colors.APPBAR_HEADER_COLOR,
        tabBarInactiveTintColor: colors.NIGHER_RIDER,
      }}>
      <TopTab.Screen
        options={{tabBarLabel: 'Pending'}}
        name="PendingOrders"
        component={Orders}
      />
      <TopTab.Screen
        options={{tabBarLabel: 'Failed'}}
        name="CancelledOrders"
        component={CancelledOrders}
      />
      <TopTab.Screen
        options={{tabBarLabel: 'Success'}}
        name="SuccessfullOrders"
        component={SuccessfullOrders}
      />
    </TopTab.Navigator>
  );
}

const HomeTabs = ({navigation}) => {
  const {companyName} = useSelector(state => state.currentUser);
  const [activeColor, setActiveColor] = useState(colors.APPBAR_HEADER_COLOR);
  const [inactiveColor, setInactiveColor] = useState(colors.GREY_BUNKER);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,

        tabBarStyle: {
          backgroundColor: colors.WHITE,
          height: 55,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({route, navigation}) => ({
          headerShown: true,
          headerTitle: 'Cyizere - ' + companyName,
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
          headerTintColor: colors.APPBAR_HEADER_COLOR,
          tabBarItemStyle: {marginBottom: 10},
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="home" color={color} size={size} />;
          },
        })}
      />
      <Tab.Screen
        name="Add"
        component={AddProduct}
        options={{
          headerShown: true,
          headerTitle: 'Add New Product',
          headerTintColor: colors.APPBAR_HEADER_COLOR,
          tabBarLabel: 'Add Product',
          tabBarItemStyle: {marginBottom: 10},
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="add-circle-outline" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Ord"
        component={OrderTabs}
        options={{
          tabBarLabel: 'Orders',
          tabBarItemStyle: {marginBottom: 10},
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="cart" color={color} size={size} />;
          },
        }}
      />

      <Tab.Screen
        name="Account"
        component={Profile}
        options={{
          tabBarItemStyle: {marginBottom: 10},
          tabBarLabelStyle: {fontSize: 14},
          tabBarIcon: ({focused, color, size}) => {
            return <Icon2 name="gear" color={color} size={size} />;
          },
        }}
      />
      {/* <Tab.Screen
        name="Peoples"
        component={People}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="people" color={color} size={size} />;
          },
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('People');
          },
        }}
      /> */}
    </Tab.Navigator>
  );
};

const User = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colors.BACKGROUND_COLOR}
        barStyle="dark-content"
      />
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs1"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            headerTransparent: true,
            title: '',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{
            title: 'Edit Product',
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            title: 'Change password',
          }}
        />
        <Stack.Screen
          name="ChangeInfo"
          component={ChangeInfo}
          options={{
            title: 'Update user information',
            headerTintColor: colors.WHITE,
            headerStyle: {backgroundColor: colors.APPBAR_HEADER_COLOR},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default User;
