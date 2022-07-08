import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Dashboard from '../Components/Dashboard/Dashboard';


const DashboardPage = () => {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default DashboardPage;