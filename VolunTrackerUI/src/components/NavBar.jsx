import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import {Link} from "react-router-dom";
import logo from '../assets/VolunTrackerIcon.png';

function Navbar() {
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
                <div className='column'>
                    <Link to="/user">
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
                <NavItemLink to='/user/login' text='Login' />
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