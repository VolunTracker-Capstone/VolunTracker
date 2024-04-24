import React from 'react';
import {Link, useNavigate} from "react-router-dom";

function Events() {
    let url = "https://voluntrackerapi.azurewebsites.net/events";
    let navigate = useNavigate();
    let path = "/events"
    return (
        <div className={'home'}>
            <div className={'homeRows'}>
                <div className={'column'}>
                    <p>Events</p>
                </div>
            </div>
        </div>
    );
}

export default Events;