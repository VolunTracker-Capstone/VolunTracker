import '../App.css'
import { CiCirclePlus } from "react-icons/ci";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { BsClipboard2DataFill } from "react-icons/bs";
import { FaFile } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

import React, { useEffect, useState } from 'react';

function Manage() {
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decodedToken = parseJwt(token);
            console.log(decodedToken);
            setUserInfo(decodedToken);
        }
    }, []);

    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        console.log(JSON.parse(jsonPayload))
        return JSON.parse(jsonPayload);
    }
    return(
        <div className="manageGrid">
            <div id="manageNav">
                <div id="manageNavItems"><MdSpaceDashboard /> Dashboard</div>
                <div id="manageNavItems"><MdPeopleAlt/> Organization</div>
                <div id="manageNavItems"><BsClipboard2DataFill/> Reports</div>
                <div id="manageNavItems"><FaFile/> Files</div>
                <div id="manageNavItems"><IoIosSettings/> Settings</div>
            </div>
            <div className="manageContent">
                <h1>Administered Organizations</h1>
                {userInfo && <h1>Welcome {userInfo.firstName}</h1>}
                <CiCirclePlus id="addOrgButton" size={60}/>
            </div>
        </div>
    );
}

export default Manage;