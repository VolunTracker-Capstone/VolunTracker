import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import useAuth from "../user/useAuth.jsx";
import {useUserOrganizations} from "../user/UserOrganizationsContext.jsx";
import VoluntrackerImage from "../../assets/VolunTrackerIcon.png";
import { IoEnter } from "react-icons/io5";
import {MdSpaceDashboard} from "react-icons/md";


function OrganizationDetails() {
    let url = "https://voluntrackerapi.azurewebsites.net/UserJoinsOrg";
    let navigate = useNavigate();
    let path = "/organizations";
    let pathUnauthenticated = "/user/login";
    const { state: { name, description, organizationID } } = useLocation();
    const { userOrganizations, setUserOrganizations } = useUserOrganizations();
    const { jwt, login, logout, isAuthenticated } = useAuth();
    const [userInfo, setUserInfo] = useState({});


    function isUserInOrg(){
        for (let i = 0; i < userOrganizations.length; i++){
            if (organizationID === userOrganizations[i].organizationID){
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        console.log(userOrganizations);
        const token = jwt;
        if (token) {
            const decodedToken = parseJwt(token);
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
        return JSON.parse(jsonPayload);
    }

    const handleSubmit = (e) => {
        if (isAuthenticated() && !isUserInOrg()){
            e.preventDefault();
            joinOrganization();
        } else if (isUserInOrg()) {
            e.preventDefault();
            leaveOrganization();
        } else {
            navigate(pathUnauthenticated);
        }
    };

    function leaveOrganization(){

        const deleteUrl = `https://voluntrackerapi.azurewebsites.net/UserJoinsOrg/${organizationID}/${userInfo.memberID}`;
        fetch(deleteUrl, {
            method: 'DELETE',
        })
            .then(async response => {
                console.log('Response status:', response.status);

                if (!response.ok) {
                    const error = 'An error occurred';
                    return Promise.reject(error);
                }
                console.log('Leave successful');
                navigate(path);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    function joinOrganization(){
        const currentDate = new Date().toISOString();
        const data = {
            'memberID': userInfo.memberID,
            'orgID': organizationID,
            'hoursWorked': 0,
            'role': 'user',
            'joinDate': currentDate
        };
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(async response => {
                console.log('Response status:', response.status);

                if (!response.ok) {
                    const error = 'An error occurred';
                    return Promise.reject(error);
                }
                console.log('Join successful');
                navigate(path);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (

        <div className="organization-details">
            <div className="content">
                <form onSubmit={handleSubmit} className="org-form">
                    <div ><IoEnter  size={250}  /> </div>
                    {isUserInOrg() ? (
                        <h1 className="title">Would you like to leave {name}?</h1>
                    ) : (
                        <h1 className="title">Would you like to join {name}?</h1>
                    )}

                    <h2 className="description">Description: {description}</h2>
                    {isUserInOrg() ? (
                        <button type="submit" className="fancybutton leave-org-button">Leave  {name} </button>
                    ) : (
                        <button type="submit" className="fancybutton join-org-button">Join {name}</button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default OrganizationDetails;