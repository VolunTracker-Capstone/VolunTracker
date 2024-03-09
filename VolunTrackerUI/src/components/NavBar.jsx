import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import logo from '../assets/VolunTrackerIcon.png';

function Navbar() {
    return (
        <Nav className='mainNav' activeKey='/'>
            <div className='mainHeader'>
                <div className='column'>
                    <h2 id='pageTitle'> VolunTracker </h2>
                </div>
                <div className='column'>
                    <img id='voluntrackerLogo' src={logo} alt='VolunTracker Logo' />
                </div>
                <div className='column'>
                    <VscAccount size={50} style={{ fill: 'white' }} id='userIcon' />
                </div>
            </div>
            <div className='separator'></div>
            <div className='navLinks'>
                <NavItemLink to='/' text='Home' />
                <NavItemLink to='/about' text='About Us' />
                <NavItemLink to='/' text='Organizations' />
                <NavItemLink to='/' text='Events' />
                <NavItemLink to='/' text='Manage' />
                <NavItemLink to='/login' text='Login' />
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