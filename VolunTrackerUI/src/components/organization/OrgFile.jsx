import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {MdPeopleAlt, MdSpaceDashboard} from "react-icons/md";
import {BsClipboard2DataFill} from "react-icons/bs";
import {FaAddressBook, FaFile} from "react-icons/fa";
import {IoIosSettings} from "react-icons/io";

function OrgFile(props) {
    const { organizationId } = useParams();
    const ManageLink = `/Manage`;
    const OrgLink = `/Manage/${organizationId}`;
    const EventLink = `/Manage/${organizationId}/events`;
    const ReportLink = `/Manage/${organizationId}/report`;
    const FilesLink = `/Manage/${organizationId}/files`;
    const SettingsLink = `/Manage/${organizationId}/settings`;
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

        <div><h1>This Organization has no files</h1></div>
        </div>

    );
}

export default OrgFile;