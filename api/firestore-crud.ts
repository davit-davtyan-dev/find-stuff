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

  protected serializeData(
    doc: {id: string; data: () => T | undefined},
    fallbackData?: Partial<T>,
  ) {
    const data = (doc.data() || fallbackData || {}) as T;

    return {
      id: doc.id,
      ...data,
      createdAt: 'createdAt' in data ? String(data.createdAt) : undefined,
    };
  }

  async create(data: T) {
    const ref = await this.collection.add({
      ...data,
      createdAt: new Date(),
      _v: 1,
    });
    const newDocument = await ref.get();

    return this.serializeData(newDocument, data);
  }

  async get(
    filters: Partial<
      Record<
        keyof T,
        | string
        | Partial<
            Record<
              FirebaseFirestoreTypes.WhereFilterOp,
              string | number | boolean | Array<string> | Array<number>
            >
          >
      >
    > = {},
  ) {
    let query = this.collection.orderBy('createdAt', 'asc');

    for (const key in filters) {
      let opStr: FirebaseFirestoreTypes.WhereFilterOp = '==';
      let value = filters[key] as any;
      if (
        typeof filters[key] === 'object' &&
        Object.keys(filters[key]).length
      ) {
        opStr = Object.keys(
          filters[key],
        )[0] as FirebaseFirestoreTypes.WhereFilterOp;
        value = filters[key][opStr];
      }
      query = query.where(key, opStr, value);
    }

    const data = await query.get();

    return data.docs.map(doc => this.serializeData(doc));
  }

  async getById(id: string) {
    const doc = await this.collection.doc(id).get();
    return this.serializeData(doc);
  }

  update(id: string, data: Partial<T & {_v: number}>) {
    return this.collection.doc(id).update(data as any);
  }

  delete(id: string) {
    return this.collection.doc(id).delete();
  }
}
