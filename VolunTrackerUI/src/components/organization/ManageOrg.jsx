import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {MdPeopleAlt, MdSpaceDashboard} from "react-icons/md";
import {BsClipboard2DataFill} from "react-icons/bs";
import {FaFile} from "react-icons/fa";
import {IoIosSettings} from "react-icons/io";
import { FaAddressBook } from "react-icons/fa";
import useAuth from "../user/useAuth.jsx";
import { useParams } from 'react-router-dom';

function ManageOrg(props) {
    const [members, setMembers] = useState([]);
    const { organizationId } = useParams();  // Fetching the organizationId from URL
    const { jwt } = useAuth();

    // Use organizationId in your URLs
    const ManageLink = `/Manage`;
    const EventLink = `/Manage/${organizationId}/events`;
    const OrgLink = `/Manage/${organizationId}`;
    const ReportLink = `/Manage/${organizationId}/report`;
    const FilesLink = `/Manage/${organizationId}/files`;
    const SettingsLink = `/Manage/${organizationId}/settings`;

    // API URL with dynamic organizationId
    const url = `https://voluntrackerapi.azurewebsites.net/organizations/${organizationId}/members`;

    useEffect(() => {
        const fetchMembers = async () => {
            if (jwt) { // Only fetch if the jwt token is present
                try {
                    // Fetching organization members
                    const responseOrgMembers = await fetch(url, {
                        headers: { 'Authorization': `Bearer ${jwt}` }
                    });
                    const orgMembers = await responseOrgMembers.json();

                    // Fetching all members to get their usernames
                    const responseAllMembers = await fetch('https://voluntrackerapi.azurewebsites.net/members', {
                        headers: { 'Authorization': `Bearer ${jwt}` }
                    });
                    const allMembers = await responseAllMembers.json();

                    // Map organization members to their usernames
                    const memberDetails = orgMembers.map(member => {
                        const memberDetail = allMembers.find(m => m.memberID === member.memberID);
                        return {
                            ...member,
                            username: memberDetail ? memberDetail.username : 'Unknown'
                        };
                    });

                    setMembers(memberDetails);
                } catch (error) {
                    console.error('Error fetching members:', error);
                }
            }
        };

        fetchMembers();
    }, [jwt, url]); // Adding url as a dependency

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
                <h2>Members of Organization {organizationId}:</h2>
                <ul>
                    {members.map(member => (
                        <li key={member.memberID}>
                            <Link to={`/manage/${member.orgID}/${member.memberID}`}>{member.username}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ManageOrg;
