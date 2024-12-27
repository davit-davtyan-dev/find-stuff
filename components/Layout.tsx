import React, {type PropsWithChildren} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ThemedView} from './ThemedView';
import NavigationHeader from './NavigationHeader';

import type {Item} from '../api/items.api';

type LayoutProps = PropsWithChildren<{
  title: string;
  breadcrumbsItem?: Item;
  canGoBack?: boolean;
  scrollViewRef?: React.MutableRefObject<ScrollView | null>;
}>;

export default function Layout(props: LayoutProps) {
  return (
    <>
      <NavigationHeader
        title={props.title}
        item={props.breadcrumbsItem}
        canGoBack={props.canGoBack}
      />

      <ThemedView style={styles.container}>
        <ScrollView ref={props.scrollViewRef}>
          <ThemedView style={styles.content}>{props.children}</ThemedView>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: 'hidden',
  },
});
