import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { useFirebase } from '../../firebase';
import { handleAuthErrorCode } from '../../firebase/errorMessageHandler';

export default function Home() {
  const navigate = useNavigate();
  const { firebaseAuth } = useFirebase();

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
