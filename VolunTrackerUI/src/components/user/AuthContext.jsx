// import {createContext} from "react";
//
// export const AuthContext = createContext({
//     jwt: localStorage.getItem('jwt'),
//     setJwt: () => {}
// });

import React, { useState } from 'react';

export const AuthContext = React.createContext({
    jwt: null,
    setJwt: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [jwt, setJwt] = useState(localStorage.getItem('jwt'));

    return (
        <AuthContext.Provider value={{ jwt, setJwt }}>
            {children}
        </AuthContext.Provider>
    );
};