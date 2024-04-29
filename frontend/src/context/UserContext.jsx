import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [selectedUserData, setSelectedUserData] = useState(null);

    return (
        <UserContext.Provider value={{ selectedUserData, setSelectedUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;