import Favorite from '@mui/icons-material/Favorite'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import React, { useState } from 'react'

const Like = ({handleLike, like }) => {
  return (
    <>
      <div style={{color: like ? 'red' : 'white'}} onClick={handleLike}>
        <Favorite color='inherit' />
      </div>
    </>
  )
}

export default Like
