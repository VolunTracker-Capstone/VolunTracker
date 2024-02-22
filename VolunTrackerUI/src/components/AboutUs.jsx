import { useState } from 'react'
import '../App.css'

function AboutUs() {
    const [count, setCount] = useState(0)

    return (
        <>
            <h1>About Us</h1>
            <div className="card">
                <p>
                    Coming Soon! We are working hard.
                </p>
            </div>
        </>
    )
}

export default AboutUs
