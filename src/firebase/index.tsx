import { createContext, useEffect, useState, useContext } from 'react';
import firebaseCredentials from './firebaseCredentials';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, User } from 'firebase/auth';

import { Props, ContextType } from './types';

import { handleAuthErrorCode } from './errorMessageHandler';

const FirebaseContext = createContext<ContextType>(null!);

export default ({ children }: Props) => {
  const [firebase, setFirebase] = useState<ContextType['firebase']>(null!);
  const [database, setDatabase] = useState<ContextType['database']>(null!);
  const [firebaseAuth, setFirebaseAuth] = useState<ContextType['firebaseAuth']>(null!);
  const [user, setUser] = useState<ContextType['user']>(null);
  const [loadingUser, setLoadingUser] = useState<ContextType['loadingUser']>(false);

  useEffect(() => {
    //Check if firebase is already initialized

    if (getApps().length) return;
    //Initialize firebase
    const app = initializeApp(firebaseCredentials);
    //Set up analytics
    setFirebase(app);
    //Database
    setDatabase(getFirestore(app));
    //Auth
    const auth = getAuth(app);
    setFirebaseAuth(auth);
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
