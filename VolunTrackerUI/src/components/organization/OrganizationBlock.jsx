import React from 'react';
import {Link} from "react-router-dom";

function OrganizationBlock({ name, organizationID, description}) {
    return (
        <div className="organization-box">
            <span className="organization-name"><Link to={`/organizations/${organizationID}`} state={{ name, description, organizationID }}>{name}</Link></span>
        </div>
    );
}

export default OrganizationBlock;