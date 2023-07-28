import React from 'react'
import { useParams } from 'react-router-dom';
const Detail = () => {
  const { helpPostId } = useParams();
  return (
    <div>{helpPostId}</div>
  )
}

export default Detail