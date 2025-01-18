import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileMain"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        initialParams={{title: 'Profile'}}
      />
    </Stack.Navigator>
  );
}
