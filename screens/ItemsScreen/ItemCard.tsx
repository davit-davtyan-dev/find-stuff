import React from 'react';
import {ThemedText} from '../../components/ThemedText';
import Card from '../../components/Card';
import Breadcrumbs from '../../components/Breadcrumbs';
import useNavigation from '../../hooks/useNavigation';
import useContainerItems from '../../hooks/useContainerItems';
import useItemHref from '../../hooks/useItemHref';
import Logger from '../../utils/logger';

import type {Item} from '../../api/items.api';

const logger = new Logger('ItemCard');

interface ItemCardProps {
  item: Item;
  showPath?: boolean;
  onItemEdit?: () => void;
  onItemDelete?: () => void;
}

export default function ItemCard(props: ItemCardProps) {
  const {id, name, isContainer, tags} = props.item;
  const href = useItemHref(props.item);

  const navigation = useNavigation();
  const itemContent = useContainerItems({container: props.item});
  // const itemContent = allItems.filter(i => i.containerId === id);

  const handlePress = () => {
    logger.log(`Navigating to ${name} "${id}"`);
    navigation.navigate('RoomsTab', href);
  };

  return (
    <Card
      title={
        <>
          <ThemedText type="subtitle">{name}</ThemedText>
          {isContainer && (
            <ThemedText>
              {itemContent.length
                ? `${itemContent.length} item${
                    itemContent.length > 1 ? 's' : ''
                  }`
                : 'Container is empty'}
            </ThemedText>
          )}
          {props.showPath && <Breadcrumbs href={href} fontSize={12} />}
        </>
      }
      onTitlePress={isContainer ? handlePress : undefined}
      tags={tags}
      onEdit={props.onItemEdit}
      onDelete={props.onItemDelete}
    />
  );
}
