import {FirestoreApi} from './firestore-crud';

export interface Item {
  id: string;
  name: string;
  roomId: string;
  container?: Item;
  containerId?: string;
  isContainer?: boolean;
  tags: Array<string>;
  createdAt?: string;
}

export type ItemFormData = Omit<Item, 'id'>;

class ItemsApi extends FirestoreApi<Omit<Item, 'id'>> {}

export default new ItemsApi('items');
