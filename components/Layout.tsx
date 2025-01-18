import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ThemedView} from './ThemedView';
import NavigationHeader from './NavigationHeader';

import type {Item} from '../api/items.api';
import type {ViewProps} from './custom';

type LayoutProps = {
  title?: string;
  breadcrumbsItem?: Item;
  canGoBack?: boolean;
  scrollViewRef?: React.MutableRefObject<ScrollView | null>;
} & ViewProps;

export default function Layout({
  title,
  breadcrumbsItem,
  canGoBack,
  scrollViewRef,
  children,
  ...props
}: LayoutProps) {
  return (
    <>
      {title && (
        <NavigationHeader
          title={title}
          item={breadcrumbsItem}
          canGoBack={canGoBack}
        />
      )}

      <ThemedView flex={1}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}>
          <ThemedView flex={1} p={4} gap={16} overflow="hidden" {...props}>
            {children}
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
});
