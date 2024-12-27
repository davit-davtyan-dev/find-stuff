import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {TouchableOpacity, Row, Divider} from './custom';
import {ThemedText} from './ThemedText';
import Breadcrumbs from './Breadcrumbs';
import useColors from '../hooks/useColors';
import useNavigation from '../hooks/useNavigation';
import useItemHref from '../hooks/useItemHref';

import type {Item} from '../api/items.api';

interface NavigationHeaderProps {
  title: string;
  item?: Item;
  canGoBack?: boolean;
}

interface ItemsBreadcrumbsProps {
  item: Item;
}

const NavigationHeader = (props: NavigationHeaderProps) => {
  const colors = useColors();
  const navigation = useNavigation();

  return (
    <>
      <Row p={4} bgColor={colors.background}>
        {props.canGoBack && (
          <TouchableOpacity px={2} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left"
              color={colors.text}
              size={26}
            />
          </TouchableOpacity>
        )}
        {props.item ? (
          <ItemsBreadcrumbs item={props.item} />
        ) : (
          <ThemedText type="subtitle">{props.title}</ThemedText>
        )}
      </Row>
      <Divider bgColor={colors.backgroundSecondary} />
    </>
  );
};

function ItemsBreadcrumbs({item}: ItemsBreadcrumbsProps) {
  const href = useItemHref(item);

  return <Breadcrumbs href={href} type="subtitle" />;
}

export default NavigationHeader;
