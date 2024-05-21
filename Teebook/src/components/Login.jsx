import React, {useState} from 'react'
import { useNavigate } from 'react-router'

const Login = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [loginError, setLoginError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === '' || password === '') return setLoginError('Please fill in all fields')
        fetch('http://localhost:5000/token', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        if (data.error) {
            setLoginError(data.error)
        }
        else {
            sessionStorage.setItem("token", data.access_token)
            navigate('/dashboard')
        }
    
    })
    .catch(err => console.log('ERROR: ', err))

    }
    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === 'email') {
            setEmail(value)
        } else {
            setPassword(value)
        }
    }

  return (
    <>
<form onSubmit={handleSubmit} className="login-form">
    <h1 className="login-title">Login</h1>
    {loginError && <p className='login-error'>{loginError}</p>}
    <input type='text' placeholder='email' name="email" onChange={handleChange} value={email} className="login-input" />

    <input type='password' placeholder='password' name='password' onChange={handleChange} value={password} className="login-input" />
    <button type='submit' className="login-button">Login</button>
</form>
</>
  )
}


export default Login