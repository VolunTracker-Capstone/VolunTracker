import React from 'react';
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div style={{textAlign:'center', padding:'5px'}}>
            <p style={{fontSize: '140px', padding:'10px'}}> 404 </p>
            <p style={{fontSize: '50px', padding:'10px'}}> Sorry, Page Not Found </p>
            <p style={{fontSize: '40px', padding:'10px'}}> The page you requested could not be found </p>
            <div style={{padding:'10px'}}>
                <Link className={'button'} to="/"> Back to homepage </Link>
            </div>
        </div>
    );
}

export default NotFound;