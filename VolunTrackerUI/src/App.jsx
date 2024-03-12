import './App.css'
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx'
import {Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Login from "./components/user/Login.jsx";
import User from "./components/user/User.jsx";
import AccountCreation from "./components/user/AccountCreation.jsx";
import ForgotPassword from "./components/user/ForgotPassword.jsx";

function App() {

    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<AboutUs/>} />
                <Route path="/organization" element={<Home/>} />
                <Route path="/events" element={<Home/>} />
                <Route path="/manage" element={<Home/>} />
                <Route path="create-account" element={<AccountCreation/>} />
                <Route path="/user">
                    <Route path="" element={<User/>} />
                    <Route path="login" element={<Login/>} />
                    <Route path="password-reset" element={<ForgotPassword/>} />
                </Route>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
    )
}

export default App