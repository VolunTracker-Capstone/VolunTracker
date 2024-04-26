import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import {MdPeopleAlt, MdSpaceDashboard} from "react-icons/md";
import {FaAddressBook, FaFile} from "react-icons/fa";
import {BsClipboard2DataFill} from "react-icons/bs";
import {IoIosSettings} from "react-icons/io";

function OrganizationEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { organizationId } = useParams(); // useParams hook to get organizationId from the route
    const ManageLink = `/Manage`;
    const EventLink = `/Manage/${organizationId}/events`;
    const OrgLink = `/Manage/${organizationId}`;
    const ReportLink = `/Manage/${organizationId}/report`;
    const FilesLink = `/Manage/${organizationId}/files`;
    const SettingsLink = `/Manage/${organizationId}/settings`;

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true); // Start loading
            try {
                const response = await fetch('https://voluntrackerapi.azurewebsites.net/events');
                const allEvents = await response.json();

                // Parse the organizationId to ensure the type matches that of eventOwnerID in your data
                const orgId = parseInt(organizationId, 10);

                // Filter events by the parsed organization ID
                const relatedEvents = allEvents.filter(event => event.eventOwnerID === orgId);
                setEvents(relatedEvents);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            } finally {
                setLoading(false); // Stop loading regardless of the outcome
            }
        };

        fetchEvents();
    }, [organizationId]); // Depend on organizationId to refetch when it changes

    if (loading) {
        return <div>Loading events...</div>;
    }

    return (
        <div>
            <div className="manageGrid">
                <div id="manageNav">
                    <Link to={ManageLink}><div id="manageNavItems"><MdSpaceDashboard /> Dashboard</div></Link>
                    <Link to={OrgLink}><div id="manageNavItems"><MdPeopleAlt/> Organization</div></Link>
                    <Link to={EventLink}><div id="manageNavItems"><FaAddressBook /> Events</div></Link>
                    <Link to={ReportLink}><div id="manageNavItems"><BsClipboard2DataFill/> Reports</div></Link>
                    <Link to={FilesLink}><div id="manageNavItems"><FaFile/> Files</div></Link>
                    <Link to={SettingsLink}><div id="manageNavItems"><IoIosSettings/> Settings</div></Link>
                </div>
            <h2>Events for Organization {organizationId}</h2>
            {events.length > 0 ? (
                <ul>
                    {events.map(event => (
                        <li key={event.eventID}>{event.name} - {event.date}</li>
                    ))}
                </ul>
            ) : (
                <p>No events found for this organization.</p>
            )}
            <Link to={`/Manage/${organizationId}/events/create`}>
                <CiCirclePlus id="addOrgButton" size={60} />
            </Link>
            </div>
        </div>
    );
}

export default OrganizationEvents;
