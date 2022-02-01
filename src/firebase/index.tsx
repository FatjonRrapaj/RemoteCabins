import { createContext, useEffect, useState, useContext } from 'react';
import firebaseCredentials from './firebaseCredentials';
import firebaseApp from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/auth';

import { Props, ContextType } from './types';

const FirebaseContext = createContext<ContextType | undefined>(undefined);

export default ({ children }: Props) => {
  const [firebase, setFirebase] = useState<ContextType['firebase']>({});
  const [database, setDatabase] = useState<ContextType['database']>({});
  const [firebaseAuth, setFirebaseAuth] = useState<ContextType['firebaseAuth']>({});
  const [user, setUser] = useState<ContextType['user']>(null);
  const [loadingUser, setLoadingUser] = useState<ContextType['loadingUser']>(true);

  useEffect(() => {
    //Check if firebase is already initialized
    if (firebase && firebaseApp.apps.length) return;

    //Initialize firebase
    firebaseApp.initializeApp(firebaseCredentials);
    //Set up analytics
    if ('measurementId' in firebaseCredentials) firebaseApp.analytics();
    setFirebase({
      firebaseApp,
    });
    //Database
    setDatabase(firebaseApp.firestore());
    //Auth
    const auth = firebaseApp.auth();
    setFirebaseAuth(auth);
    //Listen to authenticated user
    const unsubscribeFromAuth = firebaseApp.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const { uid, displayName, email, photoURL } = user;
          setUser({ uid, displayName, email, photoURL });
          setLoadingUser(false);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        database,
        firebaseAuth,
        user,
        setUser,
        loadingUser,
        setLoadingUser,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
