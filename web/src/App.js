import React, { useState } from "react";
import "./App.css";
import PrivateRoutes from './components/private-routes/PrivateRoutes';
import localStorageService
 from "./services/LocalStorageService";
 
function App() {
  const [role, setRole] = useState(localStorageService.getRole());

  return (
    <div className="App">
      <PrivateRoutes role={role} setRole={setRole} />
    </div>
  );
}

export default App;
