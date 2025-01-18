import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';

const Stack = createNativeStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="LoginMain"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="LoginMain"
        component={LoginScreen}
        initialParams={{title: 'Login'}}
      />
    </Stack.Navigator>
  );
}
