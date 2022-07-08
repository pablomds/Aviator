import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Users from '../Components/Users/Users';
import User from '../Components/User/User';
const UsersPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/:id" element={<User />} />
    </Routes>
  );
}

export default UsersPage