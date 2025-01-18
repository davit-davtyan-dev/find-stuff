import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

interface AnyRecord {
  [key: string]: any;
}

export class FirestoreApi<T extends AnyRecord = AnyRecord> {
  protected collection: FirebaseFirestoreTypes.CollectionReference<T>;
  constructor(collectionPath: string) {
    this.collection = firestore().collection<T>(collectionPath);
  }

  async create(data: T) {
    const ref = await this.collection.add({
      ...data,
      createdAt: new Date(),
      _v: 1,
    });
    const newDocument = await ref.get();

    return {
      id: newDocument.id,
      ...(newDocument.data() || data),
    };
  }

  async get() {
    const data = await this.collection.orderBy('createdAt', 'asc').get();

    return data.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  update(id: string, data: Partial<T>) {
    return this.collection.doc(id).update(data as any);
  }

  delete(id: string) {
    return this.collection.doc(id).delete();
  }
}
