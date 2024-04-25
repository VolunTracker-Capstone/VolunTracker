import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import useAuth from "../user/useAuth.jsx";
import {useUserOrganizations} from "../user/UserOrganizationsContext.jsx";

function EventDetails() {
    let url = "https://voluntrackerapi.azurewebsites.net/UserAttendsEvent";
    let navigate = useNavigate();
    let path = "/events";
    let pathUnauthenticated = "/user/login";

    const { state: { name, eventID } } = useLocation();
    const { userOrganizations, setUserOrganizations } = useUserOrganizations();
    const { jwt, login, logout, isAuthenticated } = useAuth();
    const [userInfo, setUserInfo] = useState({});
    const [userInEvent, setUserInEvent] = useState(false);
    const [checkedIn, setCheckedIn] = useState(false);
    const [checkedOut, setCheckedOut] = useState(false);
    const [eventInfo, setEventInfo] = useState({});


    async function isUserInEvent(){
        let isUserInEventUrl = `https://voluntrackerapi.azurewebsites.net/events/${eventID}/members`;
        let membersAttendingEventFetch = await fetch(isUserInEventUrl);
        let membersAttendingEvent = await membersAttendingEventFetch.json();
        for (let i = 0; i < membersAttendingEvent.length; i++){
            if (userInfo.email === membersAttendingEvent[i].email){
                setUserInEvent(true);
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        async function fetchData() {
            let eventInfoUrl = `https://voluntrackerapi.azurewebsites.net/events/${eventID}`;
            let eventInfoResponse = await fetch(eventInfoUrl);
            let eventInfoJson = await eventInfoResponse.json();
            const eventDate = new Date(eventInfoJson.date);
            const formattedDate = eventDate.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });
            let formattedEventInfo = {
                city: eventInfoJson.city,
                date: formattedDate,
                eventID: eventInfoJson.eventID,
                eventImage: eventInfoJson.eventImage,
                eventOwnerID: eventInfoJson.eventOwnerID,
                name: eventInfoJson.name,
                state: eventInfoJson.state,
                street: eventInfoJson.street,
                volunteersNeeded: eventInfoJson.volunteersNeeded,
                zip: eventInfoJson.zip,
            }
            setEventInfo(formattedEventInfo);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const token = jwt;
        if (token) {
            const decodedToken = parseJwt(token);
            setUserInfo(decodedToken);
        }
    }, []);

    useEffect(() => {
        if (userInfo.email && eventID) {
            isUserInEvent().then(result => {
                setUserInEvent(result);
            });
        }
    }, [userInfo.email, eventID]);

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

    const handleSubmit = (e) => {
        if (isAuthenticated() && !userInEvent){
            e.preventDefault();
            joinEvent();
            setUserInEvent(true);
        } else if (isAuthenticated()) {
            e.preventDefault();
            leaveEvent();
            setUserInEvent(false);
        } else {
            navigate(pathUnauthenticated);
        }
    };

    const checkIn = (e) => {
        e.preventDefault();
        let checkInUrl = `https://voluntrackerapi.azurewebsites.net/UserAttendsEvent/${eventID}/${userInfo.memberID}/checkIn`;

        setCheckedIn(true);

    }

    const handleCheckInOrOut = (e) => {
        if (!checkedIn){
            e.preventDefault();
            checkIn();
            setCheckedIn(true);
        } else {
            e.preventDefault();
            checkOut();
        }
    }

    function leaveEvent(){
        const deleteUrl = `https://voluntrackerapi.azurewebsites.net/UserAttendsEvent/${eventID}/${userInfo.memberID}`;
        fetch(deleteUrl, {
            method: 'DELETE',
        })
            .then(async response => {
                console.log('Response status:', response.status);

                if (!response.ok) {
                    const error = 'An error occurred';
                    return Promise.reject(error);
                }
                console.log('Leave successful');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    function joinEvent(){
        const data = {
            'memberID': userInfo.memberID,
            'eventID': eventID,
            'checkIn': null,
            'checkOut': null
        };
        console.log(data);
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(async response => {
                console.log('Response status:', response.status);

                if (!response.ok) {
                    const error = 'An error occurred';
                    return Promise.reject(error);
                }
                console.log('Join successful');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
        <div>

            <h2>Event Details: {name}</h2>
            <div>
                <p><strong>Date:</strong> {eventInfo.date}</p>
                <p><strong>Location:</strong> {eventInfo.street}, {eventInfo.city}, {eventInfo.state}, {eventInfo.zip}</p>
                <p><strong>Volunteers Needed:</strong> {eventInfo.volunteersNeeded}</p>
            </div>
            {userInEvent ? (
                <div>
                    <p>Please check in upon arrival.</p>
                    <button onClick={handleSubmit} type="submit" className="leave-event-button">Leave Event</button>
                    <button onClick={checkedIn} type="submit" style={{marginLeft: "10px"}} className="checkIn-event-button">Check In</button>
                </div>
            ) : (
                <div>
                    <p>Please Join!</p>
                    <button onClick={handleSubmit} type="submit" className="join-event-button">Join Event</button>
                </div>
            )}

        </div>
    );
}

export default EventDetails;