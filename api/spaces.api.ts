import {FirestoreApi} from './firestore-crud';

export interface Space {
  id: string;
  name: string;
  createdBy: string;
  createdAt?: string;
}

export type SpaceFormData = Omit<Space, 'id'>;

class SpacesApi extends FirestoreApi<SpaceFormData> {}

export default new SpacesApi('spaces');
