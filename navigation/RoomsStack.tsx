import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RoomsScreen from '../screens/RoomsScreen/RoomsScreen';
import ItemsStack from './ItemsStack';
import {RoomsContext} from '../contexts/RoomsContext';
import {ItemsContext} from '../contexts/ItemsContext';

const Stack = createNativeStackNavigator();

export default function RoomsStack() {
  const {rooms} = useContext(RoomsContext);
  const {items} = useContext(ItemsContext);

  return (
    <Stack.Navigator
      initialRouteName="Rooms"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Rooms"
        component={RoomsScreen}
        initialParams={{title: 'Rooms'}}
      />
      {rooms.map(room => (
        <Stack.Screen
          key={room.id}
          name={room.id}
          component={ItemsStack}
          options={{title: room.name}}
          initialParams={{
            currentRouteName: room.id,
            title: room.name,
            items: items.filter(
              item => item.roomId === room.id && !item.containerId,
            ),
            roomId: room.id,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
