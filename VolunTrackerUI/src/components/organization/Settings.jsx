import React, {useState, useEffect} from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { BsClipboard2DataFill } from "react-icons/bs";
import { FaFile } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import {Button} from "react-bootstrap";
function Settings(props) {
    function handleDelete() {
        const organizationIdToDelete = 5002; // The ID of the organization to delete

        fetch(`https://voluntrackerapi.azurewebsites.net/organizations/${organizationIdToDelete}`, {
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
                    <div id="manageNavItems"><MdSpaceDashboard /> Dashboard</div>
                    <div id="manageNavItems"><MdPeopleAlt/> Organization</div>
                    <div id="manageNavItems" style={{ color: 'orange'}}><BsClipboard2DataFill/> Reports</div>
                    <div id="manageNavItems"><FaFile/> Files</div>
                    <div id="manageNavItems"><IoIosSettings/> Settings</div>
                </div>
                <div className="column">
                    <p>Settings</p>
                    <p>Do you wish to delete the organization?</p>
                    <Button onClick={handleDelete}>Delete Organization</Button>
                </div>
                <div className="column">
                    <div>
<p> HEllo</p>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Settings;