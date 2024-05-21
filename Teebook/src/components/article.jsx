import React, {useState} from 'react'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function IconCheckboxes({ articleid, token, has_liked, likes, setLikes }) {
  const [checked, setChecked] = useState(has_liked);
  
  const handleLike = async (e) => {
    const liked = e.target.checked;
    const url = liked ? "http://localhost:5000/like" : "http://localhost:5000/unlike";
    
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ post_id: articleid })
      });
      setChecked(liked);
      setLikes(liked ? likes+1 : likes -1)
      // You need to handle likes state management in the parent component
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  }

  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={handleLike}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
      />
    </div>

  );
}

const Article = ({article}) => {
    const token = sessionStorage.getItem("token")
    const [likes, setLikes] = useState(article.likes)

    
  return (
    <>
    <div className="article">
    <h2 className="article-title">{article.title}</h2>
    <p className="article-author">Author: {article.author}</p>
    <p className="article-content">{article.content}</p>
    <p className="article-date">Date: {article.date}</p>
    <p className="article-likes">Likes: {likes}</p>
    <div className="article-buttons">
    <IconCheckboxes articleid={article._id} token={token} has_liked={article.liked} likes={likes } setLikes={setLikes}/>

    <button
        className="save-button"
        // onClick={() => handleSaveArticle(article)
        // }
    >
        Save Article
    </button>

    </div>
    </div>
    </>
  )
}

export default Article
