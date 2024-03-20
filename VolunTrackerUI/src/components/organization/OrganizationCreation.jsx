import '../../App.css'
import React, {useState} from "react";
import { FiUpload } from "react-icons/fi";

function OrganizationCreation(){
    const [orgName, setOrgName] = useState('');
    const [orgAddress, setOrgAddress] = useState('');
    const [orgCity, setOrgCity] = useState('');
    const [orgState, setOrgState] = useState('');
    const [orgZip, setOrgZip] = useState('');
    const [orgImg, setOrgImg] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Organization Name:', orgName);
        console.log('Organization Street:', orgAddress);
        console.log('Organization City:', orgCity);
        console.log('Organization State:', orgState);
        console.log('Organization Zip:', orgZip);
        console.log('Organization image:', orgImg);
    };

    return(
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
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            required
                            className="createOrgInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="orgCreationLabels">Street Address:</label>
                        <input
                            type="text"
                            value={orgAddress}
                            onChange={(e) => setOrgAddress(e.target.value)}
                            required
                            className="createOrgInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="orgCreationLabels">City:</label>
                        <input
                            type="text"
                            value={orgCity}
                            onChange={(e) => setOrgCity(e.target.value)}
                            required
                            className="createOrgInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="orgCreationLabels">State:</label>
                        <select className="createOrgSelectField" value={orgState} onChange={e => setOrgState(e.target.value)}>
                            <option>Illinois</option>
                            <option>Arizona</option>
                            <option>Texas</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <label className="orgCreationLabels">Zip:</label>
                        <input
                            type="text"
                            pattern="[0-9]{5}"
                            value={orgZip}
                            onChange={(e) => setOrgZip(e.target.value)}
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
        </div>
    );
}

export default OrganizationCreation;