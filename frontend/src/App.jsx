import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'sonner'
import axios from 'axios';


import Home from './pages/home.page';
import AuthForm from './pages/auth-form.page';
import VerifyEmail from './pages/verify-email';
import VerifyResetEmail from './pages/forgot-passowrd/forgot-password.page';
import CheckEmailForPassword from './pages/forgot-passowrd/check-email-reset-pass.page';
import ResetPassword from './pages/forgot-passowrd/reset-password.page';
import { checkUserAuth } from './store/userSlice';
import LeftSideBar from './components/left-sidebar-component';
import ProfilePage from './pages/profile.page';
// import SinglePost from './components/single.post.component';

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
        // console.log(error.response.data.message);
        dispatch(checkUserAuth(null));
      }
    };
    checkAuthAsync();
  }, [dispatch, navigate]);

  return (
    <>

      <Toaster size='large' position="top-right" />
      <Routes>
        {/* Password Forgot */}
        <Route path='/forgot-password' element={<VerifyResetEmail />} />
        <Route path='/check-email' element={<CheckEmailForPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />

        {/* Authenticated Routes */}
        <Route path='/signup' element={<AuthForm type='signup' />} />
        <Route path='/signin' element={<AuthForm type='signin' />} />
        <Route path='/verify-email' element={<VerifyEmail />} />

        {/* Left sidebar route with nested routes */}
        <Route path='/' element={<LeftSideBar />}>
          {/* Home route protected by ProtectedRoute */}
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/profile/:userId' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          {/* <Route path='/post/:postId' element={<ProtectedRoute><SinglePost /></ProtectedRoute>} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
