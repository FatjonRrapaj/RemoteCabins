import { FirebaseApp } from 'firebase/app';
import { Auth, User } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

//needed for the context in order to work
type ContextType = {
  firebase: !FirebaseApp;
  database: !Firestore;
  firebaseAuth: !Auth;
  user: User | null;
  setUser: !Function;
  loadingUser: !Object;
  setLoadingUser: !Function;
};

export { Props, ContextType };
