import '../../App.css'
import React, {useState} from "react";
import { FiUpload } from "react-icons/fi";

function EventCreation(){
    const [eventName, setEventName] = useState('');
    const [eventAddress, setEventAddress] = useState('');
    const [eventCity, setEventCity] = useState('');
    const [eventState, setEventState] = useState('');
    const [eventZip, setEventZip] = useState('');
    const [eventImg, setEventImg] = useState('');
    const [eventVolunteers, setEventVolunteers] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Event Name:', eventName);
        console.log('Event Street:', eventAddress);
        console.log('Event City:', eventCity);
        console.log('Event State:', eventState);
        console.log('Event Zip:', eventZip);
        console.log('Event Image:', eventImg);
        console.log('Event Volunteers Needed:', eventVolunteers);
        console.log('Event Description:', eventDescription);
    };

    return(
        <div className="createEventContainer">
            <div className="createEventHeader">
                <h1>Create an Event</h1>
                <p>Create your public event for your organization</p>
            </div>
            <div className="eventFormContainer">
                <form>
                    <div className="input-container">
                        <label className="eventCreationLabels">Event Name:</label>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                            className="createEventInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="eventCreationLabels">Street Address:</label>
                        <input
                            type="text"
                            value={eventAddress}
                            onChange={(e) => setEventAddress(e.target.value)}
                            required
                            className="createEventInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="eventCreationLabels">City:</label>
                        <input
                            type="text"
                            value={eventCity}
                            onChange={(e) => setEventCity(e.target.value)}
                            required
                            className="createEventInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="eventCreationLabels">State:</label>
                        <select className="createEventSelectField" value={eventState} onChange={e => setEventState(e.target.value)}>
                            <option>Illinois</option>
                            <option>Arizona</option>
                            <option>Texas</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <label className="eventCreationLabels">Zip:</label>
                        <input
                            type="text"
                            pattern="[0-9]{5}"
                            value={eventZip}
                            onChange={(e) => setEventZip(e.target.value)}
                            required
                            className="createEventInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="eventCreationLabels">Volunteers Needed:</label>
                        <input
                            type="text"
                            value={eventVolunteers}
                            onChange={(e) => setEventVolunteers(e.target.value)}
                            required
                            className="createEventInputField"
                        />
                    </div>
                </form>
            </div>
            <div className="eventImageFormContainer">
                <div className="dragImage" >
                    <FiUpload id="uploadIcon" size={90} style={{color: '#e27602'}}/>
                    <img style={{width:150, maxHeight:200, position:"relative" }} src={eventImg}/>
                </div>
                <h3>Upload a Profile Picture for Event</h3>
                <input
                    id="eventImgUpload"
                    type="file"
                    accept="image/*"
                    title=" ade"
                    onChange={e => { setEventImg(URL.createObjectURL(e.target.files[0])); document.getElementById('uploadIcon').style.display = 'none';}}
                />
                <div className="eventDescriptionContainer">
                    <label className="eventDescriptionLabel">Description of Event:</label>
                    <input
                        type="text"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        required
                        className="createEventInputField"
                    />
                </div>
            </div>
            <button type="submit" className="createEventButton" onClick={handleSubmit}>Create Event</button>
        </div>
    );
}

export default EventCreation;