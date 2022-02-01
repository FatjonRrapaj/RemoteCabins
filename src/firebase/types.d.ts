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
  firebase: App | null;
  database: !Firestore;
  firebaseAuth: !Auth;
  user: User | null;
  setUser: !Function;
  loadingUser: !Object;
  setLoadingUser: !Function;
  isAuthenticated: !Boolean;
};

export { Props, ContextType };
