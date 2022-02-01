import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFirebase } from '../../firebase';

function AuthProtectedRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { loadingUser, firebaseAuth } = useFirebase();

  useEffect(() => {
    firebaseAuth?.onAuthStateChanged(function (user) {
      if (!user) navigate('/login', { replace: true, state: { from: location } });
    });
  }, []);

  if (!firebaseAuth) {
    return null;
  }

  return children;
}

export default AuthProtectedRoute;
