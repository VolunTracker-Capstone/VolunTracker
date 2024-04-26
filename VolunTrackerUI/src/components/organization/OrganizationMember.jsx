import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {MdPeopleAlt, MdSpaceDashboard} from "react-icons/md";
import {BsClipboard2DataFill} from "react-icons/bs";
import {FaAddressBook, FaFile} from "react-icons/fa";
import {IoIosSettings} from "react-icons/io";
import {Card} from "react-bootstrap";

function OrganizationMember(props) {
    const [memberDetails, setMemberDetails] = useState(null);
    const { organizationId, memberId } = useParams();
    const ManageLink = `/Manage`;
    const OrgLink = `/Manage/${organizationId}`;
    const EventLink = `/Manage/${organizationId}/events`;
    const ReportLink = `/Manage/${organizationId}/report`;
    const FilesLink = `/Manage/${organizationId}/files`;
    const SettingsLink = `/Manage/${organizationId}/settings`;
    useEffect(() => {
        const fetchMemberDetails = async () => {
            try {
                // Fetch members list
                const membersResponse = await fetch(`https://voluntrackerapi.azurewebsites.net/members`);
                const members = await membersResponse.json();
                const member = members.find(m => m.memberID.toString() === memberId);

                // Fetch organization's member list
                const orgResponse = await fetch(`https://voluntrackerapi.azurewebsites.net/organizations/${organizationId}/members`);
                const orgMembers = await orgResponse.json();
                const orgMemberDetails = orgMembers.find(m => m.memberID.toString() === memberId);

                // Combine details if both member and organization member are found
                if (member && orgMemberDetails) {
                    setMemberDetails({ ...member, ...orgMemberDetails });
                } else {
                    console.log('Member or organization member details not found');
                }
            } catch (error) {
                console.error('Error fetching member details:', error);
            }
        };

        fetchMemberDetails();
    }, [organizationId, memberId]); // Ensure both dependencies are included here

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

                <div style={{ padding: '20px' }}>
                    <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>Member Details</h1>
                    {memberDetails ? (
                        <Card style={{ width: 'auto', maxWidth: '500px' }}>
                            <Card.Header as="h2">Member Details</Card.Header>
                            <Card.Body>
                                <Card.Title>{memberDetails.firstName} {memberDetails.lastName}</Card.Title>
                                <Card.Text>ID: {memberDetails.memberID}</Card.Text>
                                <Card.Text>Role: {memberDetails.role}</Card.Text>
                                <Card.Text>Hours Worked: {memberDetails.hoursWorked}</Card.Text>
                            </Card.Body>
                        </Card>
                    ) : (
                        <p>Loading member details...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrganizationMember;
