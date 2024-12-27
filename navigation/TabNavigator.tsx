import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import RoomsStack from './RoomsStack';
import SearchStack from './SearchStack';
import useColors from '../hooks/useColors';

const Tab = createBottomTabNavigator();

interface TabIconProps {
  color: string;
  size: number;
}

const RoomsTabIcon = ({color, size}: TabIconProps) => (
  <MaterialCommunityIcons name="home-outline" size={size} color={color} />
);

const SearchTabIcon = ({color, size}: TabIconProps) => (
  <MaterialCommunityIcons name="magnify" size={size} color={color} />
);

export default function TabNavigator() {
  const colors = useColors();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.backgroundSecondary,
        },
      }}>
      <Tab.Screen
        name="RoomsTab"
        component={RoomsStack}
        options={{tabBarIcon: RoomsTabIcon, tabBarLabel: 'Rooms'}}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{tabBarIcon: SearchTabIcon, tabBarLabel: 'Search'}}
      />
    </Tab.Navigator>
  );
}
