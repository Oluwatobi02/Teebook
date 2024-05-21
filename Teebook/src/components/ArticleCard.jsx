import React, { useState } from 'react'
import Like from './Like'
import { useNavigate } from 'react-router'

const ArticleCard = ({ article }) => {


  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const [follow, setFollow] = useState(false)
  const [like, setLike] = useState(article.liked)
  const [likes, setLikes] = useState(article.likes)
  
  //handleLike
  const handleLike = async () => {
    const url = !like ? "http://localhost:5000/like" : "http://localhost:5000/unlike";
    
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ post_id: article._id })
      });
      setLike(!like)
      setLikes(!like ? likes+1 : likes -1)
      // You need to handle likes state management in the parent component
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  }

  return (
    <>
    {article === undefined ? <h1>Loading...</h1> : 
    <div className='twitter-card-container'>
        <div className='twitter-card-header'>
            <div className='avater-username'>
              <img src='https://nextui.org/avatars/avatar-1.png' alt='' />
              <div className='name-container'>
                <h4 className='name'>{article.author}</h4>
                <p className='username'>@{article.author}</p>
              </div>
            </div>
            <button className={follow ? 'onfollow-button' : 'follow-button'} onClick={() => setFollow(!follow)}>{follow ? 'Following':'Follow'}</button>
        </div>
        <div className='twitter-card-body'  onClick={()=> navigate(`/post/${article._id}`)}>
        <div className='body-text'>
          <p className='text'>{article.content}</p>
        </div>
        </div>
        <div className='twitter-card-footer'>
          {/* <p className='following'>4 Following</p>
          <p className='followers'>97.1K Follwers</p> */}
          <div className='like'>
          <Like handleLike={handleLike} like={like}/>
          <p className='like-count'>{likes}</p>
          </div>
          <p className='twitter-card-date'>{article.date}</p>

        </div>
    </div>
}

    </>
  )
}

export default ArticleCard
