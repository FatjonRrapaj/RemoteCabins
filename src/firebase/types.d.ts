import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

type User = {
  uid: String;
  displayName: String | null;
  email: String | null;
  photoURL: String | null;
};

//needed for the context in order to work
type ContextType = {
  firebase: !Object;
  database: !Object;
  firebaseAuth: !Object;
  user: User | null;
  setUser: !Object;
  loadingUser: !Object;
  setLoadingUser: !Object;
};

export { Props, ContextType };
