import React from 'react';
import {Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import logo from '../VolunTrackerIcon.png';
import {VscAccount} from "react-icons/vsc";


function Navbar() {
    return (
        <div>
            <Nav className={'mainNav'} activeKey={'/'}>
                <div className={'navRow1'}>
                    <div className={'column'}>
                        <h2 id={'pageTitle'}> VolunTracker </h2>
                    </div>
                    <div className={'column'}>
                        <img id={'voluntrackerLogo'} src={logo} alt={'VolunTracker Logo'}/>
                    </div>
                    <div className={'column'}>
                        <VscAccount size={50} style={{fill: 'white'}} id={'userIcon'}/>
                    </div>
                </div>
                <div className={'separator'}></div>
                <div className={'navRow2'}>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to={'/'}><span id={'home'} className={'nav-item'}>Home</span></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to={'/'}><span className={'nav-item'}>About Us</span></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to={'/'}><span className={'nav-item'}>Organizations</span></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to={'/'}><span className={'nav-item'}>Events</span></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to={'/'}><span className={'nav-item'}>Manage</span></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to={'/'}><span className={'nav-item'}>Login</span></Nav.Link>
                    </Nav.Item>
                </div>
            </Nav>
        </div>
    );
}

export default Navbar;