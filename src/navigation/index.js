import 'react-native-gesture-handler';
import React from 'react';
import {Pressable, View} from 'react-native';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import colors from '../constants/colors';
import Toast from 'react-native-toast-message';
import SelectSupplier from '../screens/SelectSupplier';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Icon from 'react-native-vector-icons/dist/Ionicons';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const HomeTabs = ({navigation}) => {
  const {selectedSupplier} = useSelector(state => state.suppliers);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.APPBAR_HEADER_COLOR,
        tabBarInactiveTintColor: colors.GREY_BUNKER,
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
    </Tab.Navigator>
  );
};

function index() {
  const {selectedSupplier} = useSelector(state => state.suppliers);
  return (
    <>
      <StatusBar backgroundColor={colors.APPBAR_HEADER_COLOR} />
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
            }}
          />
          <Stack.Screen
            name="HomeTabs1"
            component={HomeTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SelectSupplier"
            component={SelectSupplier}
            options={{
              title: 'Select Supplier',
              headerBackVisible: false,
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default index;
