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
    const [unformattedCheckInTime, setUnformattedCheckInTime] = useState();
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
    }, [[eventID, userInfo.memberID, checkedOut, checkedIn, checkOutTime, checkInTime]]);

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
                setUnformattedCheckInTime(userAttendsEvent.checkIn);
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

    const checkIn = async (e) => {
        e.preventDefault();
        let currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 5);
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
        await fetch(checkInUrl, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        });
        setCheckedIn(true);
        setUnformattedCheckInTime(currentDate);
        setCheckInTime(formattedDate);
    }

    const checkOut = async (e) => {
        e.preventDefault();
        let currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 5);
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
        fetch(checkInUrl, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        })
        setCheckedOut(true);
        setCheckOutTime(formattedDate);
        let updateUserInOrgHoursUrl = `https://voluntrackerapi.azurewebsites.net/UserJoinsOrg/${eventInfo.eventOwnerID}/${userInfo.memberID}`;
        let updateMemberTotalHoursUrl = `https://voluntrackerapi.azurewebsites.net/members/${userInfo.memberID}/updateHours`;
        let hoursWorkedDecimal = await getHoursWorkedInDecimal(currentDate);
        let requestBodyHrsWrkd = {
            hoursWorked: hoursWorkedDecimal
        }
        let requestBodyTtlHrs = {
            totalHours: hoursWorkedDecimal
        }
        fetch(updateUserInOrgHoursUrl, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBodyHrsWrkd)
        })
        fetch(updateMemberTotalHoursUrl, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBodyTtlHrs)
        })
    }
    function getHoursWorkedInDecimal (unformattedCheckOutTime){
        const checkInDateTime = new Date(unformattedCheckInTime);
        const checkOutDateTime = new Date(unformattedCheckOutTime);
        checkOutDateTime.setHours(checkOutDateTime.getHours() + 5);
        const diffInMilliseconds = Math.abs(checkOutDateTime - checkInDateTime);

        const totalHours = diffInMilliseconds / (1000 * 60 * 60);
        const hours = Math.floor(totalHours);
        const minutes = Math.round((totalHours - hours) * 60);

        return hours + minutes / 60;
    }

    useEffect(() => {
        const fetchTimeWorked = async () => {
            let userAttendsEventUrl = `https://voluntrackerapi.azurewebsites.net/UserAttendsEvent/${eventID}/${userInfo.memberID}`;
            let userAttendsEventResponse = await fetch(userAttendsEventUrl);
            let userAttendsEvent = await userAttendsEventResponse.json();

            const checkIn = new Date(userAttendsEvent.checkIn);
            const checkOut = new Date(userAttendsEvent.checkOut);

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

                if (!response.ok) {
                    const error = 'An error occurred';
                    return Promise.reject(error);
                }
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
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(async response => {
                if (!response.ok) {
                    const error = 'An error occurred';
                    return Promise.reject(error);
                }
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