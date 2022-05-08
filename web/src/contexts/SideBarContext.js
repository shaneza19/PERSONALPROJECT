import { createContext, useState } from 'react';

const SideBarContext = createContext();

function SideBarContextProvider({ children }) {
  const sidebarCollapsed = localStorage.getItem("sidebar-collapsed");
  const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true);
  return (
    <SideBarContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </SideBarContext.Provider>
  );
}

export default SideBarContextProvider;

export { SideBarContext };
