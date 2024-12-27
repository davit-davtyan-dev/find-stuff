import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen/SearchScreen';

const Stack = createNativeStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator
      initialRouteName="SearchMain"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SearchMain"
        component={SearchScreen}
        initialParams={{title: 'Search'}}
      />
    </Stack.Navigator>
  );
}
