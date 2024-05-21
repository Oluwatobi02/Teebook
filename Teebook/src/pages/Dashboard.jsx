import React, { useState,useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard';
import CircularIndeterminate from '../components/loading';


const Dashboard = () => {
  const token = sessionStorage.getItem("token")
    const isLoggedIn = token ? true : false
    const [articles, setArticles] = useState([])
    const [showLoading, setShowLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [error, setError] = useState(null)
    const containerRef = useRef(null)


   useEffect(() => {
    fetch(`http://localhost:5000/posts?page=${page}`, {  
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then((res) => res.json())
    .then((data) => {
      setShowLoading(false)
      if (data.error) {
        setError(data.error)
        setShowLoading(false)
        return
      }
      setArticles((prevArticle) => [...prevArticle,...data])


    })
    .catch(err => console.log(err))
   
   },[])

   useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        // const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (containerRef.current.scrollTop + containerRef.current.clientHeight >= containerRef.current.scrollHeight) {
          console.log(containerRef.current.scrollTop, containerRef.current.scrollHeight, containerRef.current.clientHeight)
          console.log('User has reached the end of the div');
        } else {
          console.log('not exist1')
        } 
      } else {
        console.log('not exist2')
      }
    };

    // const divElement = containerRef.current;
    if (containerRef.current) {
      console.log('add listener')
      containerRef.current.addEventListener('scroll', handleScroll);
    }
    else {
      console.log('no element')
    }

    // return () => {
    //   if (divElement) {
    //     console.log('remove listener');
    //     divElement.removeEventListener('scroll', handleScroll);
    //   }
    // };
  });
  const navigate = useNavigate()

const handleLogout = () => {
  sessionStorage.clear()
  navigate('/')
}
    return (
        <>
          <div className="dashboard-container">
        {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button> 
        ) : (
        <button onClick={() => navigate('/')}>Log in</button>
        )}
            <div className="navigation">
              <div className="nav-item">
                <h3>
                  <Link to={"/profile"}>Profile</Link>
                </h3>
              </div>
              <hr />
              <div className="nav-item">
                <h3>
                  <Link to={"/makepost"}>Make a Post</Link>
                </h3>
              </div>
            </div>
            <div className="dashboard">
              <h1 className="dashboard-title">Dashboard</h1>
              <div className="article-container" ref={containerRef}>

                {articles?.map((article, index) => (
                  <ArticleCard article={article} key={index} />
                ))}
              </div>
                {showLoading && <CircularIndeterminate /> }
                {error&&<h1>{error}</h1>}
            </div>
          </div>
  
      </>
      
  )
}


export default Dashboard