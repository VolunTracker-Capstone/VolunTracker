import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../user/useAuth.jsx";
import {useUserOrganizations} from "../user/UserOrganizationsContext.jsx";

function Events() {
    let url = "https://voluntrackerapi.azurewebsites.net/events";
    let navigate = useNavigate();
    let path = "/events"
    const { jwt, login, logout, isAuthenticated } = useAuth();
    const { userOrganizations, setUserOrganizations } = useUserOrganizations();


    return (
        isAuthenticated() ? (
            <div className={'column'}>
                <p>Events</p>
                {userOrganizations.map(org => (
                    <p key={org.id}>{org.name}</p>
                ))}
            </div>
        ) : (
            <div className={'column'}>
                <p>Please log in to view events.</p>
            </div>

        )
    );
}

export default Events;