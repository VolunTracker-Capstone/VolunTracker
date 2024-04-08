// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import '../../App.css';
import {Link} from "react-router-dom";

function AccountCreation() {
    let url = "https://voluntrackerapi.azurewebsites.net/members";

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        phone: '',
        password: '',
        confirmPassword: '',
        receiveEmails: false,
    });
    const [passwordError, setPasswordError] = useState('');
    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name === 'password') {
            validatePassword(value);
        }
    };

    const validatePassword = (password) => {
        const requirements = {
            minLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecialChar: /[@$!%*?&]/.test(password),
        };

        setPasswordRequirements(requirements);

        const unmetRequirements = Object.entries(requirements)
            // eslint-disable-next-line no-unused-vars
            .filter(([_, meetsRequirement]) => !meetsRequirement)
            // eslint-disable-next-line no-unused-vars
            .map(([requirement, _]) => requirement);

        if (unmetRequirements.length === 0) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Those passwords do not match. Try again.");
            return;
        }
        const data = {
            'memberID': 8,
            'firstName': formData.firstName,
            'lastName': formData.lastName,
            'username': formData.username,
            'password': formData.password,
            'phone': formData.phone,
            'email': formData.email,
            'totalHours': 0,
            'profilePicture': "string"
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        fetch(url, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        setTimeout(() => {console.log("Loading");
        }, 500);
        console.log('Email:', formData.email);
        console.log('First Name:', formData.firstName);
        console.log('Last Name:', formData.lastName);
        console.log('Username:', formData.username);
        console.log('Phone:', formData.phone);
        console.log('Password:', formData.password);
        console.log('Confirm Password:', formData.confirmPassword);
        console.log('Receive Emails:', formData.receiveEmails);

        setPasswordError('');
    };

    return (
        <div className="login-container" style={{height: "650px"}}>
            <h1 className="login-header">Create an Account</h1>
            <p className="links">Create an account to join or create an organization.</p>
            <p className="links">Already have an account? <Link to="/user/login">Login here</Link></p>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label className="login-labels">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="login-input-field"
                        />
                    </div>
                    <div className="input-container">
                        <label className="login-labels">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="login-input-field"
                        />
                    </div>
                    <div className="input-container">
                        <label className="login-labels">Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="login-input-field"
                        />
                    </div>
                    <div className="input-container">
                        <label className="login-labels">Phone Number:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="login-input-field"
                        />
                    </div>
                    <div className="input-container">
                        <label className="login-labels">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="login-input-field"
                        />
                    </div>

                    <div className="input-container">
                        <label className="login-labels">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="login-input-field"
                        />
                        <ul className="password-requirements">
                            {Object.entries(passwordRequirements).map(([requirement, meetsRequirement]) => (
                                <li key={requirement} className={meetsRequirement ? 'valid' : 'invalid'}>
                                    {requirement === 'minLength' && (
                                        <span style={{color: meetsRequirement ? 'green' : 'red'}}>Minimum 8 characters</span>
                                    )}
                                    {requirement === 'hasUpperCase' && (
                                        <span style={{color: meetsRequirement ? 'green' : 'red'}}>At least one uppercase letter</span>
                                    )}
                                    {requirement === 'hasLowerCase' && (
                                        <span style={{color: meetsRequirement ? 'green' : 'red'}}>At least one lowercase letter</span>
                                    )}
                                    {requirement === 'hasNumber' && (
                                        <span style={{color: meetsRequirement ? 'green' : 'red'}}>At least one number</span>
                                    )}
                                    {requirement === 'hasSpecialChar' && (
                                        <span style={{color: meetsRequirement ? 'green' : 'red'}}>At least one special character (@, $, !, %, *, ?, &)</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="input-container">
                        <label className="login-labels">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="login-input-field"
                        />
                        {passwordError && <p style={{color: 'red'}}>{passwordError}</p>}
                    </div>
                    <div style={{paddingLeft: "10px"}}>
                        <label className="links">
                            <input
                                type="checkbox"
                                name="receiveEmails"
                                checked={formData.receiveEmails}
                                onChange={handleChange}
                                className="creation-checkbox"
                            />
                            <span style={{fontSize: "18px"}}> Opt in to receive email notifications </span>
                        </label>
                    </div>
                    <div className="login-button-container">
                        <button type="submit" disabled={isSubmitDisabled} className="login-button">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AccountCreation;