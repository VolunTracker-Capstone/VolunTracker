import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../user/useAuth.jsx";
import {useUserOrganizations} from "../user/UserOrganizationsContext.jsx";
import EventBlock from "./EventBlock.jsx";

function Events() {
    let url = "https://voluntrackerapi.azurewebsites.net/events";
    let navigate = useNavigate();
    let path = "/events"

    const { jwt, login, logout, isAuthenticated } = useAuth();
    const { userOrganizations, setUserOrganizations } = useUserOrganizations();
    const [joinedOrgEvents, setJoinedOrgEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const listRefAll = useRef(null);

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
                const allEventsResponse = await fetch(url);
                const allEventData = await allEventsResponse.json();
                setAllEvents(allEventData);

                let joinedOrganizationEvents = [];
                for (let i = 0; i < allEventData.length; i++) {
                    for (let j = 0; j < userOrganizations.length; j++) {
                        if (String(allEventData[i].eventOwnerID) === String(userOrganizations[j].organizationID)) {
                            joinedOrganizationEvents.push(allEventData[i]);
                            break;
                        }
                    }
                }
                setJoinedOrgEvents(joinedOrganizationEvents);
            } catch (error) {
                console.error('Error fetching or filtering organizations:', error);
            }
        };

        fetchData();

    }, );

    return (
        isAuthenticated() ? (
            <div className="event-container">
                <button className="scroll-button left" onClick={() => scroll('left', listRefAll)}>&lt;</button>
                <div className="event-list" ref={listRefAll}>
                    <p>Events</p>
                    {joinedOrgEvents.map(eachEvent => (
                        <EventBlock key={eachEvent.id} name={eachEvent.name} eventID={eachEvent.eventID} />
                    ))}
                </div>
                <button className="scroll-button right" onClick={() => scroll('right', listRefAll)}>&gt;</button>
            </div>
        ) : (
            <div className={'column'}>
                <p>Please log in to view events.</p>
            </div>

        )
    );
}

export default Events;