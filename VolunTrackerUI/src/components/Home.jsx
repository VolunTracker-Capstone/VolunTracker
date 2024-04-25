import React from 'react';
import {Button} from 'react-bootstrap';
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className={'home'}>
            <div className={'homeRows'}>
                <div className={'column'}>
                    <FaRegQuestionCircle size={150} style={{fill: '#e27602'}}/>
                    <p className={'iconTitles'}>FAQ</p>
                    <p>Have a question? Visit our FAQ page to find answers to the most commonly asked questions about VolunTracker.</p>
                    <Link to="faq" className={'homeButton'} >FAQ</Link>
                </div>
                <div className={'column'}>
                    <IoIosPeople size={150} style={{fill: '#e27602'}}/>
                    <p className={'iconTitles'}>Why VolunTracker?</p>
                    <p >Visit our about us page where we demonstrate what VolunTracker is all about!</p>
                    <Link to="about" className={'homeButton'}>VolunTracker</Link>
                </div>
                <div className={'column'} style={{position: "relative", top: "40px"}}>
                    <FaLocationDot size={110} style={{fill: '#e27602'}}/>
                    <p className={'iconTitles'}>Get Started</p>
                    <p >Hop right in by browsing through public organizations that may interest you!</p>
                    <Link to="create-account" className={'homeButton'}>Join Now</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;