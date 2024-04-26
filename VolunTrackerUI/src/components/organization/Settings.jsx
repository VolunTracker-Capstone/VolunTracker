import React, {useState, useEffect} from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { BsClipboard2DataFill } from "react-icons/bs";
import { FaFile } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import {Button} from "react-bootstrap";
import {Link, useParams} from 'react-router-dom';

function Settings(props) {
        const { organizationId } = useParams();
        const ManageLink = `/Manage`;
        const OrgLink = `/Manage/${organizationId}`;
        const ReportLink = `/Manage/${organizationId}/report`;
        const FilesLink = `/Manage/${organizationId}/files`;
        const SettingsLink = `/Manage/${organizationId}/settings`;
    function handleDelete() {

        fetch(`https://voluntrackerapi.azurewebsites.net/organizations/${organizationId}`, {
            method: 'DELETE',
            headers: {
                // Be very careful with what you delete
                'Content-Type': 'application/json',

            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log('Organization deleted:', data);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    return (
        <div className="home">
            <div className="row justify-content-center mb-3">
                <h2>Organization Name</h2>
            </div>
            <div className="manageGrid">
                <div id="manageNav">
                    <Link to={ManageLink}><div id="manageNavItems"><MdSpaceDashboard /> Dashboard</div></Link>
                    <Link to={OrgLink}><div id="manageNavItems"><MdPeopleAlt/> Organization</div></Link>
                    <Link to={ReportLink}><div id="manageNavItems"><BsClipboard2DataFill/> Reports</div></Link>
                    <Link to={FilesLink}><div id="manageNavItems"><FaFile/> Files</div></Link>
                    <Link to={SettingsLink}><div id="manageNavItems"><IoIosSettings/> Settings</div></Link>
                </div>
                <div className="column">
                    <h3>Settings</h3>
                    <p>Do you wish to delete this organization? This action cannot be undone.</p>
                    <Button variant="danger" size="lg" onClick={handleDelete}>
                        Delete Organization
                    </Button>
                </div>
            </div>
        </div>

    );
}

export default Settings;