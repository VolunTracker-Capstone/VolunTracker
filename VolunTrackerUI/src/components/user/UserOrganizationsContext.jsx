import React, { createContext, useContext, useState } from 'react';

const UserOrganizationsContext = createContext({ userOrganizations: [], setUserOrganizations: () => {} });

export const useUserOrganizations = () => useContext(UserOrganizationsContext);

export const UserOrganizationsProvider = ({ children }) => {
    const [userOrganizations, setUserOrganizations] = useState([]);

    return (
        <UserOrganizationsContext.Provider value={{ userOrganizations, setUserOrganizations }}>
            {children}
        </UserOrganizationsContext.Provider>
    );
};