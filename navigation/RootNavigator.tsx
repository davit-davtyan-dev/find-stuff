import React from 'react';
import {ActivityIndicator} from 'react-native';
import {View} from '../components/custom';
import TabNavigator from './TabNavigator';
import LoginStack from './LoginStack';

import useInitializeUser from '../hooks/useInitializeUser';

export default function RootNavigator() {
  const {user, isInitialized, loading} = useInitializeUser();

  if (!isInitialized || loading) {
    return (
      <View h="100%" w="100%" center>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user) {
    return <TabNavigator />;
  }

  return <LoginStack />;
}
