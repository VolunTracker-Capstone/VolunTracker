import React, {useState, useEffect} from "react";


import { CiCirclePlus } from "react-icons/ci";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { BsClipboard2DataFill } from "react-icons/bs";
import {FaAddressBook, FaFile} from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import {Link, useParams} from "react-router-dom";

function OrganizationReport() {
    const { organizationId } = useParams();
    const ManageLink = `/Manage`;
    const OrgLink = `/Manage/${organizationId}`;
    const EventLink = `/Manage/${organizationId}/events`;
    const ReportLink = `/Manage/${organizationId}/report`;
    const FilesLink = `/Manage/${organizationId}/files`;
    const SettingsLink = `/Manage/${organizationId}/settings`;
    const [totalHoursSum, setTotalHoursSum] = useState(0);
    useEffect(() => {
        fetch(`https://voluntrackerapi.azurewebsites.net/organizations/${organizationId}/members`)
            .then(response => response.json())
            .then(data => {
                const sum = data.reduce((acc, member) => acc + member.hoursWorked, 0);
                setTotalHoursSum(sum);
                let impact;
                impact = sum * 31.80;
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (

        <div className="home">
            <div className="row justify-content-center mb-3">
                <h2>Organization Name</h2>
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
                    <div className="homeRows"></div>

                    <div className="card" style={{width: '250px',  margin: 50, position: "relative", left: 200}}>
                        <div className="card-body">
                            <h5 className="card-title">Total Volunteer Hours</h5>
                            <p className="card-text">{totalHoursSum} hours worked</p>
                        </div>
                    </div>

                    <div className="card" style={{width: '250px', margin: 50, position: "relative", left: 200}}>
                        <div className="card-body">
                            <h5 >Total Volunteer impact</h5>
                            <p > ${(totalHoursSum * 31.80).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="card" style={{width: '75%',  margin: 50, position: "relative", left: 150}}>
                        <div className="card-body" style={{}}>
                            <h5>How we calculate it</h5>
                            <p>We calculate this value by multiplying the volunteer hours by
                                their estimated worth using this <a href="https://independentsector.org/sector-health/value-of-volunteer-time-methodology/">
                                    methodology
                                </a></p>
                        </div>
                    </div>
                </div>
                <div className="column">

                    <div>


                    </div>

                </div>
            </div>
        </div>
    );
}

export default OrganizationReport;
// TotalMember
// How it's calculated
// Delete organization for settings
