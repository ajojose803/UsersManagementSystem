// PrivateAdminRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateAdminRoute = () => {
  const { admin, isLogged } = useSelector(state => state.admin);

  return isLogged && admin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateAdminRoute;
