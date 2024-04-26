import '../../App.css';
import React, { useState } from "react";
import { useParams } from 'react-router-dom';

function EventCreation() {
    const { organizationId } = useParams(); // This will get organizationId from the URL
    const [formData, setFormData] = useState({

        name: '',
        date: '', // Hardcoded ISO 8601 format date
        street: '',
        city: '',
        state: '',
        zip: '',
        eventImage: 'string', // This should be updated to a proper path or base64 string as needed
        volunteersNeeded: 0
    });


    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = {
            ...formData,
            eventOwnerID: organizationId, // Assign organizationId from URL parameter
        };

        try {
            const response = await fetch('https://voluntrackerapi.azurewebsites.net/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('Event created:', responseData);
            // Redirect to event list or show success message
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            // Show an error message to the user
        }
    };

    // ...

    return(
        <div className="createEventContainer">
            <div className="createEventHeader">
                <h1>Create an Event</h1>
                <p>Create your public event for your organization</p>
            </div>
            <div className="eventFormContainer">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label className="eventCreationLabels">Event Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="createEventInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="eventCreationLabels">Date:</label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="createEventInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="eventCreationLabels">Street Address:</label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                            className="createEventInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="eventCreationLabels">City:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="createEventInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="eventCreationLabels">State:</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="createEventSelectField"
                            required>

                        </input>
                    </div>
                    <div className="input-container">
                        <label className="eventCreationLabels">Zip:</label>
                        <input
                            type="text"
                            name="zip"
                            pattern="[0-9]{5}"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                            className="createEventInputField"
                        />
                    </div>
                    <div className="input-container">
                        <label className="eventCreationLabels">Volunteers Needed:</label>
                        <input
                            type="number"
                            name="volunteersNeeded"
                            value={formData.volunteersNeeded}
                            onChange={handleChange}
                            required
                            className="createEventInputField"
                        />
                    </div>
                    <div className="eventDescriptionContainer">
                        <label className="eventCreationLabels">Description of Event:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="createEventInputField"
                        />
                    </div>
                    <button type="submit" className="createEventButton">
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EventCreation;