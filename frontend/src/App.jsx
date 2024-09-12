import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import AuthForm from './pages/auth-form.page';
import VerifyEmail from './pages/verify-email';
import VerifyResetEmail from './pages/forgot-passowrd/forgot-password.page';
import CheckEmailForPassword from './pages/forgot-passowrd/check-email-reset-pass.page';
import ResetPassword from './pages/forgot-passowrd/reset-password.page';
import Home from './pages/home.page';
import { checkUserAuth } from './store/userSlice';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, isCheckingAuth } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isCheckingAuth) {
    return <div>Loading...</div>; // Loading spinner if needed
  }

  return isAuthenticated ? <>{children}</> : null;
};

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAsync = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/user/check-auth', { withCredentials: true });
        if (res.data.success) {
          dispatch(checkUserAuth(res.data.user));
        } else {
          dispatch(checkUserAuth(null));
        }
      } catch (error) {
        console.log(error);
        dispatch(checkUserAuth(null));
      }
    };
    checkAuthAsync();
  }, [dispatch, navigate]);

  return (
    <Routes>
      {/* Password Forgot */}
      <Route path='/forgot-password' element={<VerifyResetEmail />} />
      <Route path='/check-email' element={<CheckEmailForPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />

      {/* Authenticated Routes */}
      <Route path='/signup' element={<AuthForm type='signup' />} />
      <Route path='/signin' element={<AuthForm type='signin' />} />
      <Route path='/verify-email' element={<VerifyEmail />} />

      {/* Protected Route for authenticated users */}
      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
