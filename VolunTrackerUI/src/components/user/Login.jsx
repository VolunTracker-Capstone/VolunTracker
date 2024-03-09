import { useState } from 'react'
import '../../App.css'


function Login() {
    const [count, setCount] = useState(0)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add your login logic, such as sending the credentials to your backend
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
                    <div className="login-button-container"> {/* Container for centering the button */}
                        <button type="submit" className="login-button">Login</button>
                    </div>
                </form>
                <div className="links">
                    <a href="/password-reset">Forgot Password?</a>
                    <span style={{margin: '0 10px'}}>|</span>
                    <a href="/create-account">Create Account</a>
                </div>
            </div>
        </div>
    )
}

export default Login;
