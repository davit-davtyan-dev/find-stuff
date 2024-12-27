import React, {useContext, useState} from 'react';
import {Divider, Row, TouchableOpacity, View} from '../../components/custom';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemedText} from '../../components/ThemedText';
import Layout from '../../components/Layout';
import ConfirmationModal from '../../components/ConfirmationModal';
import ItemCard from './ItemCard';
import ItemFormModal from './ItemFormModal';

import useColors from '../../hooks/useColors';
import useContainerItems from '../../hooks/useContainerItems';
import {ItemsContext} from '../../contexts/ItemsContext';

import type {Item, ItemFormData} from '../../api/items.api';

export type ItemsScreenProps = {
  route?: {
    params: {
      items: Array<Item>;
      currentRouteName: string;
      title: string;
      item?: Item;
      roomId: string;
    };
  };
};

export default function ItemsScreen(props: ItemsScreenProps) {
  const colors = useColors();
  const {createItem, updateItem, deleteItem} = useContext(ItemsContext);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const {item: container, roomId, title} = props.route?.params || {};
  const items = useContainerItems({container, roomId});

  const handleItemSave = async (
    data: Omit<ItemFormData, 'roomId' | 'containerId'>,
  ) => {
    if (!roomId) {
      return;
    }
    if (itemToEdit) {
      await updateItem(itemToEdit.id, data);
    } else {
      const createData = {...data, roomId} as ItemFormData;
      if (container) {
        createData.containerId = container.id;
      }
      await createItem(createData);
    }
    setItemToEdit(null);
    setFormModalVisible(false);
  };

  const handleItemDelete = async () => {
    if (!itemToDelete) {
      return;
    }
    await deleteItem(itemToDelete.id);
    setDeleteModalVisible(false);
    setItemToDelete(null);
  };

  return (
    <Layout title={title || 'Items'} breadcrumbsItem={container} canGoBack>
      <ItemFormModal
        visible={formModalVisible}
        onRequestClose={() => {
          setFormModalVisible(false);
          setItemToEdit(null);
        }}
        onSubmit={handleItemSave}
        initialValue={itemToEdit}
      />
      <ConfirmationModal
        title="This item and all including items will be deleted. Continue?"
        visible={deleteModalVisible}
        onConfirm={handleItemDelete}
        onDecline={() => {
          setDeleteModalVisible(false);
          setItemToDelete(null);
        }}
      />
      <Row gap={8} alignItems="center" justifyContent="space-between">
        <ThemedText type="title">Items</ThemedText>
        <TouchableOpacity
          padding={8}
          margin={-8}
          onPress={() => setFormModalVisible(true)}>
          <MaterialCommunityIcons size={32} color={colors.tint} name="plus" />
        </TouchableOpacity>
      </Row>
      <Divider />
      <View mt={4} gap={24}>
        {items.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            onItemEdit={() => {
              setItemToEdit(item);
              setFormModalVisible(true);
            }}
            onItemDelete={() => {
              setItemToDelete(item);
              setDeleteModalVisible(true);
            }}
          />
        ))}
      </View>
    </Layout>
  );
}
