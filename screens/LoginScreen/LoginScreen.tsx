import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Layout from '../../components/Layout';
import {TouchableOpacity} from '../../components/custom';
import {ThemedText} from '../../components/ThemedText';

import {signIn} from '../../redux/modules/auth';
import useAppDispatch from '../../hooks/useAppDispatch';
import useColors from '../../hooks/useColors';

export default function LoginScreen() {
  const colors = useColors();
  const dispatch = useAppDispatch();

  return (
    <Layout pb={16} center>
      <ThemedText mb={16} type="title">
        Login
      </ThemedText>
      <TouchableOpacity
        py={2}
        px={4}
        center
        flexDir="row"
        borderRadius={8}
        bgColor={colors.backgroundSecondary}
        onPress={() => dispatch(signIn())}>
        <MaterialCommunityIcons name="google" size={24} color={colors.tint} />
        <ThemedText ml={2}>Login with Google</ThemedText>
      </TouchableOpacity>
    </Layout>
  );
}
