import {useMemo} from 'react';
import useAppSelector from './useAppSelector';
import type {Item} from '../api/items.api';

export default function useContainerItems({
  container,
  roomId,
}: {
  roomId?: string;
  container?: Item;
}) {
  const items = useAppSelector(state => state.item.items);

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
