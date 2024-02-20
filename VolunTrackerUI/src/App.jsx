import './App.css'
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx'
import {Route, Routes} from "react-router-dom";
import NotFound from "./NotFound.jsx";

function App() {

    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
    )
}

export default App