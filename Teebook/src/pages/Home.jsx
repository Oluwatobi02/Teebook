import React, {useEffect, useState} from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { useNavigate } from 'react-router';
import Chat from '../components/chat';



const Home = () => {
  const token = sessionStorage.getItem("token")
    const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };


  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };
  const navigate = useNavigate()

  

  return (
<>
  {(token && token != "" && token != undefined) ? useEffect(()=>navigate('dashboard')) : (
  <div>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleSignupClick}>Signup</button>

      {showLogin && <Login />}
      {showSignup && <Signup />}
      </div>
)
  }
<Chat />
  
  </>

  )
}


export default Home