import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
/***** Screens *****/
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Menu from '../screens/Menu';
import Login from '../screens/Login';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          switch (route.name) {
            case 'Home':
              return (
                <Icon
                  type="font-awesome"
                  name="home"
                  size={size}
                  color={color}
                  tvParallaxProperties={undefined}
                />
              );
              break;
            case 'Login':
              return (
                <Icon
                  type="font-awesome"
                  name="user"
                  size={size}
                  color={color}
                  tvParallaxProperties={undefined}
                />
              );
            case 'Cart':
              return (
                <Icon
                  type="font-awesome"
                  name="cart-plus"
                  size={size}
                  color={color}
                  tvParallaxProperties={undefined}
                />
              );
            default:
              return (
                <Icon
                  type="font-awesome"
                  name="bars"
                  size={size}
                  color={color}
                  tvParallaxProperties={undefined}
                />
              );
              break;
          }
        },
      })}>
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Login" component={Login}></Tab.Screen>
      <Tab.Screen name="Cart" component={Cart}></Tab.Screen>
      <Tab.Screen name="Menu" component={Menu}></Tab.Screen>
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({});

export default AppNavigator;
