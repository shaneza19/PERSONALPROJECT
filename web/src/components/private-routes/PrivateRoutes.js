import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ConfigRoutes from "../../config/Routes";
import Layout from "../../components/layout/Layout";
import ViewItem from "../../components/pages/ViewItem";
import ViewUser from "../../components/pages/ViewUser";


//default role = guest
function privateRoutes(props) {
  const role = props.role || "guest";

  const allowedRoutes = ConfigRoutes[role].allowedRoutes;
  const redirectRoutes = ConfigRoutes[role].redirectRoutes;

  return (
    <Layout>
      <Routes>
        {allowedRoutes.map((route) => (
          <Route
            path={route.url}
            key={route.url}
            element={<route.component setRole={props.setRole} />}
          ></Route>
        ))}
        <Route path="/view_item/:id" element={<ViewItem />}></Route>
        <Route path="/view_user/:id" element={<ViewUser />}></Route>
        <Route path="*" element={<Navigate replace to={redirectRoutes} />} />
      </Routes>
    </Layout>
  );
}

export default privateRoutes;
