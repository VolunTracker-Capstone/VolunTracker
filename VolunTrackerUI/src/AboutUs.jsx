import { useState } from 'react'
import voluntrackerLogo from '/VolunTrackerIcon.png'
import './App.css'

function AboutUs() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div>
                <a href="/">
                    <img src={voluntrackerLogo} className="logo" alt="VolunTracker logo" />
                </a>
            </div>
            <h1>About Us</h1>
            <div className="card">
                <p>
                    Coming Soon!
                </p>
            </div>
        </>
    )
}

export default AboutUs
