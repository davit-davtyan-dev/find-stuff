import {useContext, useMemo} from 'react';
import {ItemsContext} from '../contexts/ItemsContext';
import type {Item} from '../api/items.api';

export default function useContainerItems({
  container,
  roomId,
}: {
  roomId?: string;
  container?: Item;
}) {
  const {items} = useContext(ItemsContext);

  return useMemo(
    () =>
      items.filter(i =>
        !container && !i.containerId
          ? i.roomId === roomId
          : i.containerId === container?.id,
      ),
    [items, container, roomId],
  );
}
