import React from 'react';
import Layout from '../../components/Layout';
import {Row, TouchableOpacity, View} from '../../components/custom';
import {ThemedText} from '../../components/ThemedText';
import Avatar from './Avatar';

import {signOut} from '../../redux/modules/auth';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import useColors from '../../hooks/useColors';

export default function ProfileScreen() {
  const colors = useColors();
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  if (!user) {
    return null;
  }

  return (
    <Layout p={6} title="Profile">
      <Row gap={16}>
        <Avatar uri={user.photoURL} />
        <View>
          <ThemedText type="subtitle">{user.displayName}</ThemedText>
          <ThemedText>{user.email}</ThemedText>
        </View>
      </Row>
      <TouchableOpacity
        py={2}
        px={4}
        center
        flexDir="row"
        borderRadius={8}
        bgColor={colors.backgroundSecondary}
        onPress={() => dispatch(signOut())}>
        <ThemedText ml={2}>Sign Out</ThemedText>
      </TouchableOpacity>
    </Layout>
  );
}
