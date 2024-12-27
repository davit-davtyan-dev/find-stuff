import React, {createContext, useEffect, useState} from 'react';
import itemsApi, {type Item, type ItemFormData} from '../api/items.api';
import Logger from '../utils/logger';

type ItemsContextState = {
  items: Array<Item>;
  createItem: (data: ItemFormData) => Promise<void>;
  updateItem: (id: string, data: Partial<ItemFormData>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
};

const defaultState: ItemsContextState = {
  items: [],
  async createItem() {},
  async updateItem() {},
  async deleteItem() {},
};

const logger = new Logger('ItemsContext');

export const ItemsContext = createContext(defaultState);

export function ItemsProvider({children}: {children: React.ReactNode}) {
  const [items, setItems] = useState(defaultState.items);

  useEffect(() => {
    logger.log('Fetching items...');
    itemsApi
      .get()
      .then(result => {
        logger.log('Fetched items successfully', result.length);
        setItems(result);
      })
      .catch(error => {
        logger.log('Failed to fetch items', error);
      });
  }, []);

  const createItem: ItemsContextState['createItem'] = async data => {
    logger.log('Creating new item', data);
    try {
      const newItem = await itemsApi.create(data);
      logger.log('Item created successfully', newItem.id);
      setItems(oldValue => [...oldValue, newItem]);
    } catch (error) {
      logger.log('Failed to create item', error);
      throw error;
    }
  };

  const updateItem: ItemsContextState['updateItem'] = async (id, data) => {
    logger.log('Updating item', id, data);
    try {
      await itemsApi.update(id, data);
      logger.log('Item updated successfully', id);
      setItems(oldValue =>
        oldValue.map(item => (item.id === id ? {...item, ...data} : item)),
      );
    } catch (error) {
      logger.log('Failed to update item', error);
      throw error;
    }
  };

  const deleteItem: ItemsContextState['deleteItem'] = async id => {
    logger.log('Deleting item', id);
    try {
      await itemsApi.delete(id);
      logger.log('Item deleted successfully', id);
      setItems(oldValue => oldValue.filter(item => item.id !== id));
    } catch (error) {
      logger.log('Failed to delete item', error);
      throw error;
    }
  };

  return (
    <ItemsContext.Provider value={{items, createItem, updateItem, deleteItem}}>
      {children}
    </ItemsContext.Provider>
  );
}
