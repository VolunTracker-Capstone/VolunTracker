import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import {MdPeopleAlt, MdSpaceDashboard} from "react-icons/md";
import {FaAddressBook, FaFile} from "react-icons/fa";
import {BsClipboard2DataFill} from "react-icons/bs";
import {IoIosSettings} from "react-icons/io";
import {Button, Card, ListGroup} from "react-bootstrap";

function OrganizationEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { organizationId } = useParams();
    const ManageLink = `/Manage`;
    const EventLink = `/Manage/${organizationId}/events`;
    const OrgLink = `/Manage/${organizationId}`;
    const ReportLink = `/Manage/${organizationId}/report`;
    const FilesLink = `/Manage/${organizationId}/files`;
    const SettingsLink = `/Manage/${organizationId}/settings`;

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://voluntrackerapi.azurewebsites.net/events');
                const allEvents = await response.json();


                const orgId = parseInt(organizationId, 10);


                const relatedEvents = allEvents.filter(event => event.eventOwnerID === orgId);
                setEvents(relatedEvents);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [organizationId]);
    // in case of long load time or smth
    if (loading) {
        return <div>Loading events...</div>;
    }

    return (
        <div className="manageGrid">
            <div id="manageNav">
                <Link to={ManageLink}><div id="manageNavItems"><MdSpaceDashboard /> Dashboard</div></Link>
                <Link to={OrgLink}><div id="manageNavItems"><MdPeopleAlt/> Organization</div></Link>
                <Link to={EventLink}><div id="manageNavItems"><FaAddressBook /> Events</div></Link>
                <Link to={ReportLink}><div id="manageNavItems"><BsClipboard2DataFill/> Reports</div></Link>
                <Link to={FilesLink}><div id="manageNavItems"><FaFile/> Files</div></Link>
                <Link to={SettingsLink}><div id="manageNavItems"><IoIosSettings/> Settings</div></Link>
            </div>
            <div className="manageContent">
                <h2>Events for your organization</h2>
                {events.length > 0 ? (
                    <ListGroup>
                        {events.map(event => (
                            <ListGroup.Item key={event.eventID}>
                                <Card style={{margin: "10px"}}>
                                    <Card.Body>
                                        <Card.Title>{event.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {new Date(event.date).toLocaleString()}
                                        </Card.Subtitle>
                                        <Button variant="primary" as={Link} to={`/Manage/${organizationId}/events/${event.eventID}`}>
                                            View Details
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>No events found for this organization.</p>
                )}
                <div className="text-center mt-4">
                    <Button variant="primary" size="lg" as={Link} to={`/Manage/${organizationId}/events/create`}>
                        <CiCirclePlus /> Create New Event
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OrganizationEvents;
