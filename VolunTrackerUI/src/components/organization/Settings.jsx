import React, {useState, useEffect} from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { BsClipboard2DataFill } from "react-icons/bs";
import {FaAddressBook, FaFile} from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import {Button, Card} from "react-bootstrap";
import {Link, useParams} from 'react-router-dom';

function Settings(props) {
        const { organizationId } = useParams();
        const ManageLink = `/Manage`;
        const OrgLink = `/Manage/${organizationId}`;
        const EventLink = `/Manage/${organizationId}/events`;
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
                <h2>Settings page</h2>
            </div>
            <div className="manageGrid">
                <div id="manageNav">
                    <Link to={ManageLink}><div id="manageNavItems"><MdSpaceDashboard /> Dashboard</div></Link>
                    <Link to={OrgLink}><div id="manageNavItems"><MdPeopleAlt/> Organization</div></Link>
                    <Link to={EventLink}><div id="manageNavItems"><FaAddressBook /> Events</div></Link>
                    <Link to={ReportLink}><div id="manageNavItems"><BsClipboard2DataFill/> Reports</div></Link>
                    <Link to={FilesLink}><div id="manageNavItems"><FaFile/> Files</div></Link>
                    <Link to={SettingsLink}><div id="manageNavItems"><IoIosSettings/> Settings</div></Link>
                </div>
                <div className="column">
                    <Card>
                        <Card.Header as="h3">Settings</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Do you wish to delete this organization? This action cannot be undone.
                            </Card.Text>
                          <Link to="/Manage"><button type="button" className="delete-button" onClick={handleDelete}>
                            Delete Organization
                            </button></Link>
                        </Card.Body>
                    </Card>
                </div>


            </div>
        </div>

    );
}

export default Settings;