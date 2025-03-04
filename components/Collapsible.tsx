import React, {PropsWithChildren, useState} from 'react';
import {StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemedText} from './ThemedText';
import {ThemedView} from './ThemedView';
import {Colors} from '../constants/Colors';

export function Collapsible({
  children,
  title,
}: PropsWithChildren & {title: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen(value => !value)}
        activeOpacity={0.8}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={{transform: [{rotate: isOpen ? '90deg' : '0deg'}]}}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
