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
    const [checkInTime, setCheckInTime] = useState();
    const [checkedOut, setCheckedOut] = useState(false);
    const [checkOutTime, setCheckOutTime] = useState();
    const [eventInfo, setEventInfo] = useState({});
    const [timeWorked, setTimeWorked] = useState('');


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
        async function fetchData() {
            let userAttendsEventUrl = `https://voluntrackerapi.azurewebsites.net/UserAttendsEvent/${eventID}/${userInfo.memberID}`;
            let userAttendsEventResponse = await fetch(userAttendsEventUrl);
            let userAttendsEvent = await userAttendsEventResponse.json();
            if (userAttendsEvent.checkIn === null){
                setCheckedIn(false);
            } else {
                const eventDate = new Date(userAttendsEvent.checkIn);
                const formattedDate = eventDate.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                });
                setCheckedIn(true);
                setCheckInTime(formattedDate);
            }
            if (userAttendsEvent.checkOut === null){
                setCheckedOut(false);
            } else {
                const eventDate = new Date(userAttendsEvent.checkOut);
                const formattedDate = eventDate.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                });
                setCheckedOut(true);
                console.log("Checked Out: " + checkedOut);
                setCheckOutTime(formattedDate);
            }
        }
        fetchData();
    },[userInfo, checkedOut, checkedIn, checkOutTime, checkInTime]);
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
        const currentDate = new Date().toISOString();
        const formattedDate = currentDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
        let checkInUrl = `https://voluntrackerapi.azurewebsites.net/UserAttendsEvent/${eventID}/${userInfo.memberID}/checkIn`;
        let requestBody = {
            datetime: currentDate
        }
        console.log(requestBody);
        fetch(checkInUrl, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        })
        setCheckedIn(true);
        setCheckInTime(formattedDate);
    }

    const checkOut = (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString();
        const formattedDate = currentDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
        let checkInUrl = `https://voluntrackerapi.azurewebsites.net/UserAttendsEvent/${eventID}/${userInfo.memberID}/checkOut`;
        let requestBody = {
            datetime: currentDate
        }
        console.log(requestBody);
        fetch(checkInUrl, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        })
        setCheckedOut(true);
        setCheckOutTime(formattedDate);
    }
    useEffect(() => {
        const fetchTimeWorked = async () => {
            let userAttendsEventUrl = `https://voluntrackerapi.azurewebsites.net/UserAttendsEvent/${eventID}/${userInfo.memberID}`;
            let userAttendsEventResponse = await fetch(userAttendsEventUrl);
            let userAttendsEvent = await userAttendsEventResponse.json();
            console.log(userAttendsEvent);

            // Parse the check-in and check-out times
            const checkIn = new Date(userAttendsEvent.checkIn);
            const checkOut = new Date(userAttendsEvent.checkOut);

            // Calculate the time difference between check-in and check-out times
            const diffInMilliseconds = Math.abs(checkOut - checkIn);
            const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
            const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

            const timeWorkedString = `${hours} hours and ${minutes} minutes`;

            setTimeWorked(timeWorkedString);
        };

        fetchTimeWorked();
    }, [timeWorked]);
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
                checkedOut ? (
                    <div>
                        <h3>Completed Event!</h3>
                        <h4>Check In Time: {checkInTime}</h4>
                        <h4>Check Out Time: {checkOutTime}</h4>
                        <h4>Total Time Worked: {timeWorked}</h4>
                    </div>
                ) : (
                    <div>
                        <p>Please check in upon arrival.</p>
                        <button onClick={handleSubmit} type="submit" className="leave-event-button">Leave Event</button>
                        {!checkedIn ? (
                            <button onClick={checkIn} type="submit" style={{marginLeft: "10px"}} className="checkIn-event-button">Check In</button>
                        ) : (
                            <button onClick={checkOut} type="submit" style={{marginLeft: "10px"}} className="checkOut-event-button">Check Out</button>
                        )}
                    </div>
                )
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