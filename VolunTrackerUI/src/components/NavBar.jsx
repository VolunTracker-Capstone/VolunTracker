import React, {useEffect, useState} from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import {Link} from "react-router-dom";
import logo from '../assets/VolunTrackerIcon.png';
import useAuth from "./user/useAuth.jsx";

function Navbar() {
    const [userInfo, setUserInfo] = useState({});
    const { jwt, login, logout, isAuthenticated } = useAuth();

    const handleLogout = () => {
        logout();
    };
    useEffect(() => {
        const token = jwt;
        if (token) {
            const decodedToken = parseJwt(token);
            setUserInfo(decodedToken);
        }
    }, [jwt]);

    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    }
    return (
        <Nav className='mainNav' activeKey='/'>
            <div className='mainHeader'>
                <div className='column'>
                    <Link to="/" style={{textDecoration: "None"}}>
                        <h2 id='pageTitle'> VolunTracker </h2>
                    </Link>
                </div>
                <div className='column'>
                    <Link to="/" style={{textDecoration: "None"}}>
                        <img id='voluntrackerLogo' src={logo} alt='VolunTracker Logo' />
                    </Link>
                </div>
                <div className='column' style={{ position: 'relative' }}>
                    {/*{isAuthenticated() && <p style={{ color: 'white', fontSize: '24px', position: 'absolute', top: '40px' }}>{userInfo.username}</p>}*/}
                    <Link to="/manage">
                        <VscAccount size={50} style={{ fill: 'white' }} id='userIcon' />
                    </Link>
                </div>
            </div>
            <div className='separator'></div>
            <div className='navLinks'>
                <NavItemLink to='/' text='Home' />
                <NavItemLink to='/about' text='About Us' />
                <NavItemLink to='/organizations' text='Organizations' />
                <NavItemLink to='/events' text='Events' />
                <NavItemLink to='/manage' text='Manage' />
                {jwt === null ? <NavItemLink to='/user/login' text='Login' /> : <button className="nav-link" onClick={handleLogout} style={{ fontSize: 24, border: 'none', background: 'none', color: 'white', cursor: 'pointer'}}>Logout</button>}
            </div>
        </Nav>
    );
}

function NavItemLink({ to, text }) {
    return (
        <Nav.Item>
            <Nav.Link as={NavLink} to={to}><span className='nav-item'>{text}</span></Nav.Link>
        </Nav.Item>
    );
}

export default Navbar;