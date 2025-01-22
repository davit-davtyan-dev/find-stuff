import {FirestoreApi} from './firestore-crud';

export interface Room {
  id: string;
  name: string;
  spaceId: string;
  order?: number;
  tags: Array<string>;
  createdAt?: string;
}

export type RoomFormData = Omit<Room, 'id'>;

class RoomsApi extends FirestoreApi<Omit<Room, 'id'>> {}

export default new RoomsApi('rooms');
