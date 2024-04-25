import {useEffect, useState} from 'react'
import '../../App.css'
import {Link, useNavigate} from "react-router-dom";
import SHA256 from 'crypto-js/sha256';
import useAuth from "./useAuth.jsx";
import {useUserOrganizations} from "./UserOrganizationsContext.jsx";


function Login() {
    let url = "https://voluntrackerapi.azurewebsites.net/Login";
    let navigate = useNavigate();
    let path = "/manage";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hash, setHash] = useState('');
    const [error, setError] = useState('');
    const { jwt, login, logout, isAuthenticated } = useAuth();
    const { userOrganizations, setUserOrganizations } = useUserOrganizations();
    const [userInfo, setUserInfo] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const pwd = SHA256(password).toString();
        setHash(pwd);

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
                const token = jwt;
                if (token) {
                    const decodedToken = parseJwt(token);
                    setUserInfo(decodedToken);
                }
                const fetchData = async () => {
                    const allOrgsResponse = await fetch(url);
                    const allOrgData = await allOrgsResponse.json();

                    let userOrgs = [];
                    for (let i = 0; i < allOrgData.length; i++) {
                        let url2 = `https://voluntrackerapi.azurewebsites.net/organizations/${allOrgData[i].organizationID}/members`;
                        const orgMembersResponse = await fetch(url2);
                        const orgMembersData = await orgMembersResponse.json();
                        for (let j = 0; j < orgMembersData.length; j++) {
                            if (String(orgMembersData[j].memberID) === String(userInfo.memberID)) {
                                userOrgs.push(allOrgData[i]);
                                break;
                            }
                        }
                    }
                    setUserOrganizations(userOrgs);
                }
                fetchData();
                navigate(path);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

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
