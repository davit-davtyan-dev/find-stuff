import {useContext, useMemo} from 'react';
import {ItemsContext} from '../contexts/ItemsContext';
import {RoomsContext} from '../contexts/RoomsContext';

import type {Item} from '../api/items.api';
import type {Room} from '../api/rooms.api';

function findParents(
  item: Item,
  items: Array<Item>,
  parents: Array<Item> = [],
) {
  if (item.containerId) {
    const itemParent = items.find(i => i.id === item.containerId);

    if (itemParent) {
      return findParents(itemParent, items, [itemParent, ...parents]);
    }
  }

  return parents;
}

export default function useItemParents(item: Item): [Room, ...Array<Item>] {
  const {items} = useContext(ItemsContext);
  const {rooms} = useContext(RoomsContext);

  return useMemo(() => {
    const room = rooms.find(r => r.id === item.roomId);
    if (!room) {
      throw new Error(
        `Room for item is not found! item ${JSON.stringify(item)}`,
      );
    }

    const parents = findParents(item, items);

    return [room, ...parents];
  }, [item, items, rooms]);
}
