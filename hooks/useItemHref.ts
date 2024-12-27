import useItemParents from './useItemParents';
import type {Item} from '../api/items.api';
import type {Room} from '../api/rooms.api';

export type Href = {
  screen?: string;
  name?: string;
  params?: Href;
};

function buildItemHref(items: Array<Item | Room>, result?: Href): Href {
  const lastItem = items.pop();

  const newResult = {
    screen: lastItem?.id,
    name: lastItem?.name,
    params: result,
  };
  if (items.length) {
    return buildItemHref(items, newResult);
  }

  return newResult;
}

export default function useItemHref(item: Item) {
  const parents = useItemParents(item);

  return buildItemHref([...parents, item]);
}
