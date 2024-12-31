import React, { Children, useEffect } from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import FloatingShape from './components/FloatingShape'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import {Toaster} from 'react-hot-toast'
import { useAuthStore } from './store/authStore'

// redirect authenticated users to home page
const RedirectAuthenticatedUser = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
}

const App = () => {

  const {isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthStore();

  useEffect(() =>{
    checkAuth();
  },[checkAuth])

  console.log("isauthenticated", isAuthenticated);
  console.log("user", user);

  return (
    <div className='min-h-screen bg-gradient-to-br
    from-gray-900 via-red-900 to-gray-900 flex items-center justify-center relative overflow-hidden'>

      <FloatingShape
        color="bg-red-500" size="w-64 h-64" top="-15%" left="10%" delay={0}
      />

      <FloatingShape
        color="bg-red-500" size="w-48 h-48" top="70%" left="80%" delay={5}
      />

      <FloatingShape
        color="bg-red-500" size="w-32 h-32" top="40%" left="-10%" delay={2}
      />

    <Routes>
      <Route path='/' element={"Home"} />
      <Route 
        path='/signup' 
        element={
          <RedirectAuthenticatedUser>
            <SignUpPage/>
          </RedirectAuthenticatedUser>} 
      />
      <Route 
        path='/login' 
        element={
          <RedirectAuthenticatedUser>
            <LoginPage/>
          </RedirectAuthenticatedUser>}
        />
      <Route path='/verify-email' element={<EmailVerificationPage/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App
