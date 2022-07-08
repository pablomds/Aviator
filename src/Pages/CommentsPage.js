import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Comments from '../Components/Comments/Comments';

const CommentsPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Comments />} />
    </Routes>
  );
}

export default CommentsPage