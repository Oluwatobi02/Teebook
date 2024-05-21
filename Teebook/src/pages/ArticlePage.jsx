import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import notFound from './notFound'
import CircularIndeterminate from '../components/loading'
const ArticlePage = () => {
  const token = sessionStorage.getItem('token')
    let params = useParams()
    const postid = params.postid
    const url = `http://localhost:5000/post?postid=${postid}`
    console.log(url)
    useEffect(() => {
      fetch(url,{
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res=> res.json())
      .then(data => console.log(data))
      
    },[])


  return (
    <>
    {postid}
<CircularIndeterminate />
    </>
  )
}

export default ArticlePage
