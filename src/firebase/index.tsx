import { createContext, useEffect, useState, useContext } from 'react';
import firebaseCredentials from './firebaseCredentials';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { Props, ContextType } from './types';

const FirebaseContext = createContext<ContextType>({
  isAuthenticated: false,
  firebase: null,
  database: {},
  firebaseAuth: {},
  user: null,
  setUser: () => {},
  loadingUser: false,
  setLoadingUser: () => {},
});

export default ({ children }: Props) => {
  const [firebase, setFirebase] = useState<ContextType['firebase']>(null);
  const [database, setDatabase] = useState<ContextType['database']>({});
  const [firebaseAuth, setFirebaseAuth] = useState<ContextType['firebaseAuth']>({});
  const [user, setUser] = useState<ContextType['user']>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<ContextType['isAuthenticated']>(false);
  const [loadingUser, setLoadingUser] = useState<ContextType['loadingUser']>(false);

  useEffect(() => {
    //Check if firebase is already initialized

    if (getApps().length) return;
    //Initialize firebase
    const app = initializeApp(firebaseCredentials);
    //Set up analytics
    setFirebase({
      app,
    });
    //Database
    setDatabase(getFirestore(app));
    //Auth
    const auth = getAuth(app);
    setFirebaseAuth(auth);

    //Listen to authenticated user
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const { uid, displayName, email, photoURL } = user;
          setUser({ uid, displayName, email, photoURL });
          setIsAuthenticated(true);
          setLoadingUser(false);
        } else {
          setUser(null);
          setIsAuthenticated(false);
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
        isAuthenticated,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
