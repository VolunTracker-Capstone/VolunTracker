import React from 'react';
import {Link, useNavigate} from "react-router-dom";

function Organizations() {
    let url = "https://voluntrackerapi.azurewebsites.net/organizations";
    let navigate = useNavigate();
    let path = "/events"
    return (
        <div className={'home'}>
            <div className={'homeRows'}>
                <div className={'column'}>
                    <p>Organizations</p>
                </div>
            </div>
        </div>
    );
}

export default Organizations;