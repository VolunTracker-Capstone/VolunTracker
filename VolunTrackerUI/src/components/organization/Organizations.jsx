import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import OrganizationBlock from "./OrganizationBlock.jsx";
import useAuth from "../user/useAuth.jsx";

function Organizations() {
    let url = "https://voluntrackerapi.azurewebsites.net/organizations";
    let navigate = useNavigate();
    let path = "/events"

    const [userInfo, setUserInfo] = useState({});
    const [userOrganizations, setUserOrganizations] = useState([]);
    const [allOrganizations, setAllOrganizations] = useState([]);
    const listRefAll = useRef(null);
    const listRefJoined = useRef(null);
    const { jwt, login, logout, isAuthenticated } = useAuth();

    const scroll = (direction, listRef) => {
        const list = listRef.current;
        if (list) {
            const scrollAmount = 300; // Adjust as needed
            if (direction === 'left') {
                list.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else if (direction === 'right') {
                list.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allOrgsResponse = await fetch(url);
                const allOrgData = await allOrgsResponse.json();
                setAllOrganizations(allOrgData);

                let userOrgs = [];
                for (let i = 0; i < allOrgData.length; i++) {
                    let url2 = `https://voluntrackerapi.azurewebsites.net/organizations/${allOrgData[i].organizationID}/members`;
                    const orgMembersResponse = await fetch(url2);
                    const orgMembersData = await orgMembersResponse.json();
                    for (let j = 0; j < orgMembersData.length; j++) {
                        if (String(orgMembersData[j].memberID) === String(userInfo.memberID)) {
                            userOrgs.push(allOrgData[i]);
                            break;
                        }
                    }
                }
                if (userOrgs.length !== userOrganizations.length) {
                    setUserOrganizations(userOrgs);
                }
            } catch (error) {
                console.error('Error fetching or filtering organizations:', error);
            }
        };

        fetchData();
    }, [userInfo]);

    useEffect(() => {
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

    return (
        <div>
            <div>
                <h2>Joined Organizations:</h2>
                <div className="organization-container">
                    <button className="scroll-button left" onClick={() => scroll('left', listRefJoined)}>&lt;</button>
                    <div className="organization-list" ref={listRefJoined}>
                        {userOrganizations.map(org => (
                            <OrganizationBlock key={org.id} name={org.name} />
                        ))}
                    </div>
                    <button className="scroll-button right" onClick={() => scroll('right', listRefJoined)}>&gt;</button>
                </div>
            </div>
            <div>
                <h2>All Organizations:</h2>
                <div className="organization-container">
                    <button className="scroll-button left" onClick={() => scroll('left', listRefAll)}>&lt;</button>
                    <div className="organization-list" ref={listRefAll}>
                        {allOrganizations.map(org => (
                            <OrganizationBlock key={org.id} name={org.name} />
                        ))}
                    </div>
                    <button className="scroll-button right" onClick={() => scroll('right', listRefAll)}>&gt;</button>
                </div>
            </div>
        </div>
    );
}

export default Organizations;