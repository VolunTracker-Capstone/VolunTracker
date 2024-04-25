import {useContext} from 'react';
import {AuthContext} from "./AuthContext.jsx";

function useAuth() {
    const {jwt, setJwt} = useContext(AuthContext);

    const login = (newJwt) => {
        localStorage.setItem('jwt', newJwt);
        setJwt(newJwt);
    };

    const logout = () => {
        localStorage.removeItem('jwt');
        setJwt(null);
    };

    const isAuthenticated = () => {
        return jwt !== null;
    };

    return { jwt, login, logout, isAuthenticated };
}

export default useAuth;