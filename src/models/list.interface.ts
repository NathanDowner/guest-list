import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';

export type List = {
  id: string;
  contributors: string[];
  title: string;
  author: string;
  guests: string[];
};

export const listConverter: FirestoreDataConverter<List> = {
  toFirestore(list: WithFieldValue<List>): DocumentData {
    return {
      contributors: list.contributors,
      title: list.title,
      guests: list.guests,
      author: list.author,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): List {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title,
      author: data.author,
      contributors: data.contributors,
      guests: data.guests,
    };
  },
};
