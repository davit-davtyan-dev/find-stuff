/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {RoomsProvider} from './contexts/RoomsContext';
import {ItemsProvider} from './contexts/ItemsContext';
import TabNavigator from './navigation/TabNavigator';

function App(): React.JSX.Element {
  return (
    <RoomsProvider>
      <ItemsProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ItemsProvider>
    </RoomsProvider>
  );
}

export default App;
