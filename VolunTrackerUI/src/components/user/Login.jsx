import { useState } from 'react'
import '../../App.css'
import {Link} from "react-router-dom";


function Login() {
    let url = "https://voluntrackerapi.azurewebsites.net/Login";

    const [count, setCount] = useState(0)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(url, requestOptions)
            .then(async response => {
                const data = await response.text();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                localStorage.setItem("token", data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        setTimeout(() => {console.log("Loading");
        }, 500);
        console.log('Email:', email);
        console.log('Password:', password);
    };
    const data = {
        'email': email,
        'password': password,
    }
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
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
