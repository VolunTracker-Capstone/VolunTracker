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
import NotificationTest from "./components/NotificationTest.jsx";
import OrganizationReport from "./components/organization/OrganizationReport.jsx";
import Settings from "./components/organization/Settings.jsx";
import Organizations from "./components/organization/Organizations.jsx";
import Events from "./components/organization/Events.jsx";
import { AuthContextProvider } from './components/user/AuthContext.jsx';
import OrganizationDetails from "./components/organization/OrganizationDetails.jsx";
import { UserOrganizationsProvider } from "./components/user/UserOrganizationsContext.jsx";
import EventDetails from "./components/organization/EventDetails.jsx";

function App() {
    return (
        <AuthContextProvider>
        <UserOrganizationsProvider>
        <div>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<AboutUs/>} />
                <Route path="/organizations/create" element={<OrganizationCreation/>}>
                    {/*<Route path="/" element={<OrganizationCreation/>} />*/}
                    {/*<Route path="/create" element={<OrganizationCreation/>} />*/}
                </Route>
                <Route path="/report" element={<OrganizationReport/>}>
                </Route>
                <Route path="/Settings" element={<Settings/>}></Route>
                <Route path="/organizations" element={<Organizations/>}></Route>
                <Route path="/organizations/:organizationId" element={<OrganizationDetails/>}></Route>
                <Route path="/faq" element={<FAQ/>} ></Route>
                <Route path="/events/create" element={<EventCreation/>} />
                <Route path="/events" element={<Events/>} />
                <Route path="/events/:eventId" element={<EventDetails/>} />
                <Route path="/manage" element={<Manage/>} />
                <Route path="/notification-test" element={<NotificationTest/>} />
                <Route path="create-account" element={<AccountCreation/>} />
                <Route path="/user">
                    <Route path="" element={<User/>} />
                    <Route path="login" element={<Login/>} />
                    <Route path="password-reset" element={<ForgotPassword/>} />
                </Route>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
        </UserOrganizationsProvider>
        </AuthContextProvider>
    )
}

export default App