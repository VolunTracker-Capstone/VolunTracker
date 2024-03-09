import React, { useState } from 'react';
import '../../App.css'; // Importing the shared CSS file

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add your forgot password logic
        console.log('Email:', email);
        // Add your password reset logic here
    };

    return (
        <div className="login-container">
            <h1 className="login-header">Forgot Password</h1>
            <p className="links">Please enter your email address below.</p>
            <p className="links">We will send you a link to reset your password.</p>
            <div className="form-container" style={{paddingTop: "10px"}}>
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
                    <div className="login-button-container">
                        <button type="submit" className="login-button">Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;