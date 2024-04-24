import React from 'react';

function OrganizationBlock({ name }) {
    return (
        <div className="organization-box">
            <span className="organization-name">{name}</span>
        </div>
    );
}

export default OrganizationBlock;