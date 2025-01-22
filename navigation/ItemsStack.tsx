import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ItemsScreen, {
  type ItemsScreenProps,
} from '../screens/ItemsScreen/ItemsScreen';
import useAppSelector from '../hooks/useAppSelector';
import useContainerItems from '../hooks/useContainerItems';

import type {Item} from '../api/items.api';

const Stack = createNativeStackNavigator();

export default function ItemsStack(props: ItemsScreenProps) {
  const allItems = useAppSelector(state => state.item.items);
  const {item: container, roomId} = props.route?.params || {};
  const items = useContainerItems({container, roomId});

  return (
    <Stack.Navigator
      initialRouteName={`item-${props.route?.params.currentRouteName}`}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={`item-${props.route?.params.currentRouteName}`}
        component={ItemsScreen}
        initialParams={props.route?.params}
        options={{title: props.route?.params.title}}
      />
      {items.map((item: Item) => (
        <Stack.Screen
          key={item.id}
          name={item.id}
          component={ItemsStack}
          options={{title: item.name}}
          initialParams={{
            currentRouteName: item.id,
            title: item.name,
            items: allItems.filter(i => i.containerId === item.id),
            item: item,
            roomId: item.roomId,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
