import '../App.css'
import { CiCirclePlus } from "react-icons/ci";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { BsClipboard2DataFill } from "react-icons/bs";
import { FaFile } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import useAuth from "./user/useAuth.jsx";

function Manage() {
    const [userInfo, setUserInfo] = useState({});
    const [allOrganizations, setAllOrganizations] = useState([]);
    const [memberOrganizations, setMemberOrganizations] = useState([]);
    const { jwt, login, logout, isAuthenticated } = useAuth();

    let url = "https://voluntrackerapi.azurewebsites.net/organizations";
    let navigate = useNavigate();
    let path = "/organizations/create";

    function handleSubmit(e) {
        e.preventDefault();
        navigate(path);
    }

    const loadOrganizations = () => {
        fetch(url, requestOptions)
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log(data);
                let currentUserID = parseJwt(jwt);
                console.log(currentUserID.memberID);
                let orgs = [];
                for (let i = 0; i < data.length; i++){
                    console.log(data[i]);
                    if (data[i].organizationOwnerID == currentUserID.memberID){
                        orgs.push(data[i]);
                    }
                }
                console.log(orgs);
                setMemberOrganizations(orgs);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        setTimeout(() => {console.log("Loading");
        }, 500);
    }

    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };


    useEffect(() => {
        const token = jwt;
        if (token) {
            const decodedToken = parseJwt(token);
            setUserInfo(decodedToken);
            loadOrganizations();
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
        return JSON.parse(jsonPayload);
    }
    return(
        <>
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
                {memberOrganizations.length > 0 && isAuthenticated() ? (
                    <ul>
                        {memberOrganizations.map(org => (
                            <li key={org.id}>
                                {org.name} - Owner: {userInfo.firstName}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No organizations found.</p>
                )}
                <form onSubmit={handleSubmit}>
                    <Button type="submit" className="create-organization-button">
                        <CiCirclePlus id="addOrgButton" size={60} />
                    </Button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Manage;

//We need
/*
organizations route will display GET all orgs in a list. next to each organization with a single button that confirms you want to join?
 */