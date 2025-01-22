import {FirestoreApi} from './firestore-crud';
import type {Space} from './spaces.api';

export interface UserToSpace {
  id: string;
  userId: string;
  spaceId: string;
  space?: Space;
  createdBy?: string;
  createdAt?: string;
}

export type UserToSpaceFormData = Omit<UserToSpace, 'id'>;

class UserToSpaceApi extends FirestoreApi<UserToSpaceFormData> {}

export default new UserToSpaceApi('userToSpace');
