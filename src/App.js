import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Coins from './pages/Coins';
import Services from './pages/Services';
import Watchlist from './pages/Watchlist';
import Form from './components/form/Form';
import CoinDetails from './pages/CoinDetails';
import './_styles/App.scss';
import Login from './components/LogIn/Login';
import SignUp from './components/LogIn/SignUp';
import Home from './pages/Home'

//  firebase 
import { app } from './firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App () {
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          console.log(error.code)
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password');
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email');
          }
        })
    }
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
        })
    }
  }

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/home')
    }
  }, [])
  return (
    <>
    
      <Navbar /> 
         <ToastContainer />
        <Routes>
          <Route path='/'  element={<Coins/>} />
           <Route path="/coin/:coinId" element={<CoinDetails />}/>
        
          <Route path='/services' element={<Services/>} />
          <Route path='/watchlist' element={<Watchlist/>} />
          {/* <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} /> */}

           <Route
            path='/login'
            element={
              <Form
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(1)}
              />}
          />
          <Route
            path='/register'
            element={
              <Form
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(2)}
              />}
          />

          <Route
            path='/home'
            element={
              <Home />}
          />
         
        </Routes>
     
    </>
  )
}

export default App
