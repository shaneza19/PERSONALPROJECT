import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import PublicLayout from '../components/layouts/PublicLayout';
import { AuthContext } from '../contexts/AuthContext';
import Login from '../components/pages/Login'
import Profile from '../components/pages/Profile'
import Register from '../components/pages/Register'
import ListItem from '../components/pages/ListItem'
import ViewItem from '../components/pages/ViewItem'
import FilterItem from '../components/pages/FilterItem'
import ViewUser from '../components/pages/ViewUser'
import ViewHistory from '../components/pages/ViewHistory'

//Route path="*" redirect random urls to homepage
function RouteConfig() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      {user ? (
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Profile />} />
          <Route path="filter_item" element={<FilterItem />} />
          <Route path="list_item" element={<ListItem />} />
          <Route path="view_item/:id" element={<ViewItem />} />
          <Route path="view_user/:id" element={<ViewUser />} />
          <Route path="view_history" element={<ViewHistory />} />
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
