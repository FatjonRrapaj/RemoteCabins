import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../Auth/Login';
import SignUp from '../Auth/Signup';
import Home from '../Home';

import AuthProtectedRoute from './AuthProtectedRoute';

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <AuthProtectedRoute>
              <Home />
            </AuthProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
