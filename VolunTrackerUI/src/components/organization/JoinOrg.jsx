import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import {Button} from "react-bootstrap";
import { useEffect } from 'react';

function JoinOrg(props) {
    const { id } = useParams();
    const [orgName, setOrgName] = useState('');

    useEffect(() => {
        fetch(`https://voluntrackerapi.azurewebsites.net/organizations/${id}`)
            .then(response => response.json())
            .then(data => {
                setOrgName(data.name);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    function HandleOrg() {
    console.log(id)
    }

    return (
        <div>
            <h1>Would you like to join {orgName}?</h1>
            <button onClick={HandleOrg}>Handle Org</button>
        </div>
    );
}



export default JoinOrg;