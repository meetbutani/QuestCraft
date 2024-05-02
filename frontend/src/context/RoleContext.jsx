import { createContext, useState } from "react";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [selectedRoleData, setSelectedRoleData] = useState(null);

  return (
    <RoleContext.Provider value={{ selectedRoleData, setSelectedRoleData }}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleContext;
