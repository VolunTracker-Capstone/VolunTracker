import React from 'react';
import { useParams } from 'react-router-dom';
import {Button} from "react-bootstrap";
import { useEffect } from 'react';

function JoinOrg(props) {
            const { id } = useParams();
    // This pulls id from the url
    useEffect(() => {
        console.log(id);
    }, [id]);
    // This will log the id when it changes

    function HandleOrg(){
        console.log(id)
    }
    // function to click for id
    return (
        <div>
            <h1>Join Org Name</h1>
            <Button onClick={HandleOrg}>Handle Org</Button>

        </div>
    );
}

export default JoinOrg;