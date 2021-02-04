import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import login from '../screens/Login';
import Signup from '../screens/Signup';
import Blooddoner from '../screens/bloodDoner';
// import firebasee from '../../firebase';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="fb" component={firebasee} /> */}
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Blooddoner" component={Blooddoner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;