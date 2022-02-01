import { MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

import { useFirebase } from '../../firebase';
import { handleAuthErrorCode, handleDbErrorCode } from '../../firebase/errorMessageHandler';

type Cabin = {
  name: string;
  location: string;
};

export default function Home() {
  const navigate = useNavigate();
  const { firebaseAuth, database } = useFirebase();

  const onAddHomeSubmitted = async ({ name, location }: Cabin) => {
    try {
      const docRef = await addDoc(collection(database, 'cabins'), {
        name,
        location,
      });
      console.log('docRef: ', docRef);
    } catch (error: any) {
      handleDbErrorCode(error.code);
    }
  };

  useEffect(() => {
    console.log('database: ', database);
  }, []);

  function handleButtonClick(event: MouseEvent): void {
    event.preventDefault();
    signOut(firebaseAuth)
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch((error: any) => {
        handleAuthErrorCode(error.code);
        //todo: ?? any manual solution for this?
      });
  }

  return <button onClick={handleButtonClick}>Sign out</button>;
}
