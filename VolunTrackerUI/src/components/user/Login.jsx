import { useState } from 'react'
import '../../App.css'
import {Link} from "react-router-dom";


function Login() {
    const [count, setCount] = useState(0)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
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
