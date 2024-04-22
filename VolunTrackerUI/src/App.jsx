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
import OrganizationCreation from "./components/organization/OrganizationCreation.jsx";
import FAQ from "./components/FAQ.jsx";
import Manage from "./components/Manage.jsx";
import EventCreation from "./components/organization/EventCreation.jsx";

function App() {

    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<AboutUs/>} />
                <Route path="/organization/create" element={<OrganizationCreation/>}>
                    {/*<Route path="/" element={<OrganizationCreation/>} />*/}
                    {/*<Route path="/create" element={<OrganizationCreation/>} />*/}
                </Route>
                <Route path="/faq" element={<FAQ/>} ></Route>
                <Route path="/events" element={<EventCreation/>} />
                <Route path="/manage" element={<Manage/>} />
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