import './App.css'
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx'
import {Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound.jsx";
import AboutUs from "./components/AboutUs.jsx";

function App() {

    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<AboutUs/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
    )
}

export default App