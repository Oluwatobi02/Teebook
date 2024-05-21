import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router'

const Signup = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ name, setName ] = useState('')
    const [ age, setAge ] = useState('')
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ city, setCity ] = useState('')
    const [ state, setState ] = useState('')
    const [ country, setCountry ] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, name, age, phoneNumber, city, state, country})
        })
        .then(res => {
            if (res.ok) {
                // Read the response body once
                return res.json();
            } else {
                throw new Error('Failed to sign up');
            }
        })
        .then(data => {
            navigate('/')

        })

    }

    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === 'email') {
            setEmail(value)
        } else if(name === 'password') {
            setPassword(value)
        } else if(name === 'name') {
            setName(value)
        } else if(name === 'age') {
            setAge(value)
        } else if(name === 'phone_number') {
            setPhoneNumber(value)
        } 
        else if(name === 'city') {
            setCity(value)
        }
        else if(name === 'state') {
            setState(value)
        }
        else if(name === 'country') {
            setCountry(value)
        }
    }
  return (
<form onSubmit={handleSubmit} className="signup-form">
    <h1 className="signup-title">Signup</h1>
    <input type='text' placeholder='email' name="email" onChange={handleChange} value={email} className="signup-input" />

    <input type='password' placeholder='password' name='password' onChange={handleChange} value={password} className="signup-input" />
    <input type='text' placeholder='name' name="name" onChange={handleChange} value={name} className="signup-input" />
    <input type='text' placeholder='age' name="age" onChange={handleChange} value={age} className="signup-input" />
    <input type='text' placeholder='phone' name="phone_number" onChange={handleChange} value={phoneNumber} className="signup-input" />
    <input type='text' placeholder='city' name="city" onChange={handleChange} value={city} className="signup-input" />
    <input type='text' placeholder='state' name="state" onChange={handleChange} value={state} className="signup-input" />
    <input type='text' placeholder='country' name="country" onChange={handleChange} value={country} className="signup-input" />

    <button type='submit' className="signup-button">Signup</button>
</form>
  )
}



export default Signup