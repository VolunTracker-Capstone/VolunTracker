import React, { useState } from 'react';
import '../../App.css';
import {Link} from "react-router-dom";

function AccountCreation() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [receiveEmails, setReceiveEmails] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
        console.log('Receive Emails:', receiveEmails);
    };

    return (
        <div className="login-container">
            <h1 className="login-header">Create an Account</h1>
            <p className="links">Create an account to join or create an organization.</p>
            <p className="links">Already have an account? <Link to="/user/login">Login here</Link></p>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label className="login-labels">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="login-input-field"
                        />
                    </div>
                    <div className="input-container">
                        <label className="login-labels">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="login-input-field"
                        />
                    </div>
                    <div className="input-container">
                        <label className="login-labels">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input-field"
                        />
                    </div>
                    <div className="input-container">
                        <label className="login-labels">Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="login-input-field"
                        />
                    </div>
                    <div style={{paddingLeft: "10px"}}>
                        <label className="links">
                            <input
                                type="checkbox"
                                checked={receiveEmails}
                                onChange={(e) => setReceiveEmails(e.target.checked)}
                                className="creation-checkbox"
                            />
                            <span style={{fontSize: "18px"}}> Opt in to receive email notifications </span>
                        </label>
                    </div>
                    <div className="login-button-container">
                        <button type="submit" className="login-button">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AccountCreation;