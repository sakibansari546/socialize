import { Route, Routes } from 'react-router-dom'
import AuthForm from './pages/auth-form.page'
import VerifyEmail from './pages/verify-email'
import VerifyResetEmail from './pages/forgot-passowrd/verify-reset-password.page'
import CheckEmailForPassword from './pages/forgot-passowrd/check-email-reset-pass.page'
import ResetPassword from './pages/forgot-passowrd/reset-password.page'
import Home from './pages/home.page'

function App() {

  return (
    <>
      <Routes>

        {/* Password Forgot */}
        <Route path='/verify-reset-email' element={<VerifyResetEmail />} />
        <Route path='/check-email' element={<CheckEmailForPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />

        {/* Authenticated Routes */}
        <Route path='/signup' element={<AuthForm type='signup' />} />
        <Route path='/signin' element={<AuthForm type='signin' />} />
        <Route path='/verify-email' element={<VerifyEmail />} />

        {/* Website */}
        <Route path='/' element={<Home />} />

      </Routes>
    </>
  )
}

export default App
