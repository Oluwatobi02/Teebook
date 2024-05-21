import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router'

const Profile = () => {
  const token = sessionStorage.getItem('token')
  const isLoggedIn = token ? true : false
    const [user, setUser] = useState()
    useEffect(() => {
    fetch('http://localhost:5000/profile', {
      method: 'GET',
      headers : {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        setUser(data.user)
    })
},[])
const navigate = useNavigate()
  return (
    <div className="profile">
      <h1 className="profile-title">Profile</h1>
      {isLoggedIn ? <div className="profile-info">
        <h3>Name: <span className="profile-detail">{user?.name}</span></h3>
        <h3>Email: <span className="profile-detail">{user?.email}</span></h3>
        <h3>Phone: <span className="profile-detail">{user?.phone_number}</span></h3>
        <h3>City: <span className="profile-detail">{user?.location.city}</span></h3>
        <h3>State: <span className="profile-detail">{user?.location.state}</span></h3>
        <h3>Country: <span className="profile-detail">{user?.location.country}</span></h3>
        <h3>Number of posts: <span className="profile-detail">{user?.posts.length}</span></h3>
        <button onClick={()=> navigate('/dashboard')}>Back to Dashboard</button>
      </div>: <button onClick={()=>navigate('/')}>Login</button>}
      <button onClick={() => sessionStorage.clear()}>Logout</button>
    </div>
  )
}


export default Profile