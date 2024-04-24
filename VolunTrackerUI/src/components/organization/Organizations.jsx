import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import OrganizationBlock from "./OrganizationBlock.jsx";

function Organizations() {
    let url = "https://voluntrackerapi.azurewebsites.net/organizations";
    let navigate = useNavigate();
    let path = "/events"

    const [userOrganizations, setUserOrganizations] = useState([]);
    const [allOrganizations, setAllOrganizations] = useState([]);
    const listRef = useRef(null);

    const scroll = (direction) => {
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
        // Fetch organizations and update state
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const allOrgs = data;
                setAllOrganizations(allOrgs);
            })
            .catch(error => console.error('Error fetching organizations:', error));
    }, []);



    return (
        <div>
            <div>
                <h2>All Organizations:</h2>
                <div className="organization-container">
                    <button className="scroll-button left" onClick={() => scroll('left')}>&lt;</button>
                    <div className="organization-list" ref={listRef}>
                        {allOrganizations.map(org => (
                            <OrganizationBlock key={org.id} name={org.name} />
                        ))}
                    </div>
                    <button className="scroll-button right" onClick={() => scroll('right')}>&gt;</button>
                </div>
            </div>
        </div>
    );
}

export default Organizations;