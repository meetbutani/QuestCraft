import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [roleId, setRoleId] = useState(null);
    const [accessList, setAccessList] = useState([]);

    // Function to update role ID and access list
    const updateAuthData = (newRoleId, newAccessList) => {
        setRoleId(newRoleId);
        setAccessList(newAccessList);
    };

    return (
        <AuthContext.Provider value={{ roleId, accessList, updateAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
