import '../../App.css'
import React, {useEffect, useState} from "react";
import { FiUpload } from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import useAuth from "../user/useAuth.jsx";

function OrganizationCreation(){
    let url = "https://voluntrackerapi.azurewebsites.net/organizations";
    let postUjoUrl = "https://voluntrackerapi.azurewebsites.net/UserJoinsOrg";
    let navigate = useNavigate();
    let path = "/manage";

    const [userInfo, setUserInfo] = useState('');
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');
    const [orgImg, setOrgImg] = useState('');
    const { jwt, login, logout, isAuthenticated } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(url, requestOptions)
            .then(async response => {
                const data = await response.json();
                console.log(data);
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                const currentDate = new Date().toISOString();
                const ujoData = {
                    'memberID': userInfo.memberID,
                    'orgID': data.organizationID,
                    'hoursWorked': 0,
                    'role': 'admin',
                    'joinDate': currentDate
                };
                fetch(postUjoUrl, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(ujoData)
                })
                navigate(path);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        setTimeout(() => {console.log("Loading");
        }, 500);
    };

    useEffect(() => {
        const token = jwt;
        if (token) {
            const decodedToken = parseJwt(token);
            setUserInfo(decodedToken);
        }
    }, []);

    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    }
    const data = {
        'organizationOwnerID': userInfo?.memberID,
        'name': name,
        'street': street,
        'city': city,
        'state': state,
        'zip': zip,
        'website': website,
        'description': description
    };

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };

    return(
        <>
        {userInfo ? (
        <div className="createOrgContainer">
            <div className="createOrgHeader">
                <h1>Create an Organization</h1>
                <p>Create your own organization to manage</p>
            </div>
            <div className="orgFormContainer">
                <form>
                    <div className="input-container">
                        <label className="orgCreationLabels">Organization Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="createOrgInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="orgCreationLabels">Street Address:</label>
                        <input
                            type="text"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            required
                            className="createOrgInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="orgCreationLabels">City:</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className="createOrgInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="orgCreationLabels">State:</label>
                        <input
                            type="text"
                            pattern="[0-9]{5}"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            className="createOrgInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="orgCreationLabels">Zip:</label>
                        <input
                            type="text"
                            pattern="[0-9]{5}"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            required
                            className="createOrgInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="orgCreationLabels">Website:</label>
                        <input
                            type="text"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            required
                            className="createOrgInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="orgCreationLabels">Description:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="createOrgInputField"
                        />
                    </div>
                </form>
            </div>
            <div className="orgImageFormContainer">
                <div className="dragImage" >
                    <FiUpload id="uploadIcon" size={90} style={{color: '#e27602'}}/>
                    <img style={{width:150, maxHeight:200, position:"relative" }} src={orgImg}/>
                </div>
                <h3>Upload a Profile Picture for Organization</h3>
                <input
                    id="orgImgUpload"
                    type="file"
                    accept="image/*"
                    title=" ade"
                    onChange={e => { setOrgImg(URL.createObjectURL(e.target.files[0])); document.getElementById('uploadIcon').style.display = 'none';}}
                />
            </div>
            <button type="submit" className="createOrgButton" onClick={handleSubmit}>Create Organization</button>
        </div>) : (
            <p>Loading...</p>
        )}
        </>
    );
}

export default OrganizationCreation;