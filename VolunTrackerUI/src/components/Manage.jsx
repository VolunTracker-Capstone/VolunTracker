import '../App.css'
import { CiCirclePlus } from "react-icons/ci";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { BsClipboard2DataFill } from "react-icons/bs";
import { FaFile } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

import React from "react";

function Manage() {
    return(
        <div className="manageGrid">
            <div id="manageNav">
                <div id="manageNavItems"><MdSpaceDashboard /> Dashboard</div>
                <div id="manageNavItems"><MdPeopleAlt/> Organization</div>
                <div id="manageNavItems"><BsClipboard2DataFill/> Reports</div>
                <div id="manageNavItems"><FaFile/> Files</div>
                <div id="manageNavItems"><IoIosSettings/> Settings</div>
            </div>
            <div className="manageContent">
                <h1>Administered Organizations</h1>
                <CiCirclePlus id="addOrgButton" size={60}/>
            </div>
        </div>
    );
}

export default Manage;