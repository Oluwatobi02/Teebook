import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Posting = () => {
    const token = sessionStorage.getItem('token')
    const isLoggedIn = token ? true : false
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()      
    fetch('http://localhost:5000/makepost', {
    method: 'POST', 
    headers: {
        "Authorization": `Bearer ${token}`, // "Bearer token
        'Content-Type': 'application/json'

    },
    body: JSON.stringify({title, content})
})
.then(res => {
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json()
})
.then(data => {
    navigate('/dashboard')

})
.catch(err => console.log('ERROR: ', err))
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === 'title') {
            setTitle(value)
        } else {
            setContent(value)
        }
    }
    
  return (
    <>
    { isLoggedIn ? <form onSubmit={handleSubmit} className="post-form">
    <label htmlFor='title' className="post-label">Title:</label>
    <input type='text' placeholder='Enter title' className="post-input" id='title' name='title' onChange={handleChange} required value={title}/>

    <label htmlFor='content' className="post-label">Content:</label>
    <textarea maxLength={60} placeholder='Whats on your mind? ' className="post-input" id='content' name='content' required onChange={handleChange} value={content}/>

    <button type='submit' className="post-button">Post</button>
</form> : <button>Login</button>}


    </>
  )
}


export default Posting