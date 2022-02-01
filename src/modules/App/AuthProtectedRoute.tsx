import { useLocation, Navigate, Route } from 'react-router-dom';

import { useFirebase } from '../../firebase';

function AuthProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useFirebase();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default AuthProtectedRoute;
