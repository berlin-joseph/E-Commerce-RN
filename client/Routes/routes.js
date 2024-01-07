import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import User from '../screens/User';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import {store} from '../Redux/Store';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Bottom = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarLabelStyle: {color: '#008E97'},
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="home" size={30} color="#008E97" />
            ) : (
              <Ionicons name="home-outline" size={30} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarShowLabel: false,
          tabBarLabelStyle: {color: '#008E97'},
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="cart" size={30} color="#008E97" />
            ) : (
              <Ionicons name="cart-outline" size={30} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="person-circle-sharp" size={30} color="#008E97" />
            ) : (
              <Ionicons name="person-circle-outline" size={30} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Bottom"
            component={Bottom}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default Routes;
