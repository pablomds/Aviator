import React from 'react'
import { Routes, Route } from 'react-router-dom'

//import Layout from './Layouts/Layout';
import SecondLayout from './Layouts/SecondLayout'
import MainLayout from './Layouts/MainLayout'
import DashboardPage from './Pages/DashboardPage'
import UsersPage from './Pages/UsersPage'
import PostsPage from './Pages/PostsPage'


const App = () => {

  return (
    <MainLayout>
      <Routes>
        <Route path={"/"}element={<DashboardPage />} />
        <Route path="users/*" element={<UsersPage />} />
        <Route path="posts/*" element={<PostsPage />} />
        <Route path="todos/*" element={<UsersPage />} />
        <Route path="others/*" element={<UsersPage />} />
        <Route path="albums/*" element={<UsersPage />} />
        <Route path="/*" element={<h1>This page doesnt exists yet...</h1>} />
      </Routes>
    </MainLayout>
  );
};

export default App;
// export const UserContext = React.createContext();