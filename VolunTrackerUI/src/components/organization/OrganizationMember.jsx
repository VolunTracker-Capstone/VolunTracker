import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {MdPeopleAlt, MdSpaceDashboard} from "react-icons/md";
import {BsClipboard2DataFill} from "react-icons/bs";
import {FaFile} from "react-icons/fa";
import {IoIosSettings} from "react-icons/io";

function OrganizationMember(props) {
    const [memberDetails, setMemberDetails] = useState(null);
    const { organizationId, memberId } = useParams();
    const ManageLink = `/Manage`;
    const OrgLink = `/Manage/${organizationId}`;
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
                    <Link to={ReportLink}><div id="manageNavItems"><BsClipboard2DataFill/> Reports</div></Link>
                    <Link to={FilesLink}><div id="manageNavItems"><FaFile/> Files</div></Link>
                    <Link to={SettingsLink}><div id="manageNavItems"><IoIosSettings/> Settings</div></Link>
                </div>

            <h1>Member Details</h1>
            {memberDetails ? (
                <div>
                    <p>ID: {memberDetails.memberID}</p>
                    <p>Name: {memberDetails.firstName} {memberDetails.lastName}</p>
                    <p>Role: {memberDetails.role}</p>
                    <p>Hours Worked: {memberDetails.hoursWorked}</p>
                    {/* Add more member details here */}
                </div>
            ) : (
                <p>Loading member details...</p>
            )}
        </div>
        </div>
    );
}

export default OrganizationMember;
