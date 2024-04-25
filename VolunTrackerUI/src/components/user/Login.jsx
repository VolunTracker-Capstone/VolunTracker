import { useState } from 'react'
import '../../App.css'
import {Link, useNavigate} from "react-router-dom";
import SHA256 from 'crypto-js/sha256';
import useAuth from "./useAuth.jsx";

function Login() {
    let url = "https://voluntrackerapi.azurewebsites.net/Login";
    let navigate = useNavigate();
    let path = "/manage";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hash, setHash] = useState('');
    const [error, setError] = useState('');
    const { jwt, login, logout, isAuthenticated } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const pwd = SHA256(password).toString();
        setHash(pwd);
        console.log("Handling submit...");
        console.log(pwd);
        const data = {
            'email': email,
            'password': pwd,
        };

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(async response => {
                console.log('Response status:', response.status);
                const jwt = await response.text();

                if (!response.ok) {
                    const error = (jwt && jwt.message) || 'An error occurred';
                    setError(error);
                    return Promise.reject(error);
                }

                login(jwt);
                console.log('Login successful:', jwt);
                navigate(path);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

        console.log('Email:', email);
        console.log('Password:', password);
        console.log('HashPassword', hash);
        console.log('Request Data:', data);
    };

    return (
        <div className="login-container">
            <h1 className="login-header">Login</h1>
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
                        <label className="login-labels">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input-field"
                        />
                    </div>
                    {error && <div style={{ color: 'red' }}>Incorrect email/password. Try again.</div>}
                    <div className="login-button-container">
                        <button type="submit" className="login-button">Login</button>
                    </div>
                </form>
                <div className="links">
                    <Link to="../password-reset">Forgot Password?</Link>
                    <span style={{margin: '0 10px'}}>|</span>
                    <Link to="/create-account">Create Account</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
