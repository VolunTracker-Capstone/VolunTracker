import React from 'react';
import {Link} from "react-router-dom";

function EventBlock({ name, eventID}) {
    return (
        <div className="organization-box">
            <span className="organization-name"><Link to={`/events/${eventID}`} state={{ name, eventID }}>{name}</Link></span>
        </div>
    );
}

export default EventBlock;