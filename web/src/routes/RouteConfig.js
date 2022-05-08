import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '../components/layouts/MainLayout';
import PublicLayout from '../components/layouts/PublicLayout';

import { AuthContext } from '../contexts/AuthContext';

import Login from '../components/pages/Login'
import Profile from '../components/pages/Profile'
import Register from '../components/pages/Register'
import CreateItem from '../components/pages/CreateItem'
import ViewItem from '../components/pages/ViewItem'
import FilterItem from '../components/pages/FilterItem'
import ViewUser from '../components/pages/ViewUser'
import History from '../components/pages/History'

//Route path="*" redirect random urls to homepage
function RouteConfig() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      {user ? (
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Profile />} />
          <Route path="filter_item" element={<FilterItem />} />
          <Route path="create_item" element={<CreateItem />} />
          <Route path="view_item/:id" element={<ViewItem />} />
          <Route path="view_user/:id" element={<ViewUser />} />
          <Route path="history" element={<History />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      ) : (
        <Route path="/" element={<PublicLayout />}>
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      )}
    </Routes>
  );
}

export default RouteConfig;
