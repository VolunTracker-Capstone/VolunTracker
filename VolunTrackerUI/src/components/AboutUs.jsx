import '../App.css'
import { TbHeartHandshake } from "react-icons/tb";
import { MdOutlineReportProblem } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";

function AboutUs() {

    return (
        <div className="aboutCards">
            <div className="card">
                <TbHeartHandshake size={100} id={'missionIcon'}/>
                <h2> Mission and Vision </h2>
                <p> Our mission at VolunTracker is to help create a home for organizations and volunteers alike.
                    Volunteer-led organizations are a key part of humanity. Whether it's volunteering at local food pantries or
                    helping clean up the ocean, VolunTracker wants to help make the whole process as simple as possible. We are a completely free
                    web app that does not hide features from anybody. One thing we wanted to make clear was that anybody can volunteer and
                    anybody can create their own events. The goal was to provide the building blocks to you and let you build what you wanted.
                    You can create, join, and manage events all from your own computer or smartphone.
                </p>
            </div>
            <div className="card">
                <MdOutlineReportProblem size={100} id={'problemIcon'}/>
                <h2> The Problem </h2>
                <p>
                    The problem can be seen from two sides here. One side is for those seeking volunteers. A lot of times it is hard
                    for organizations to reach people personally. Volunteer work is necessary but there must be a better way to seek and manage
                    volunteers than using spreadsheets and posting ads in your area.
                </p>
                <br/>
                <p>
                    The other side of the problem is on the volunteer's perspective. If you are not familiar with organizations that you may want
                    to be a part of, it can be intimidating putting yourself out there. Scouring on the web through countless volunteer
                    opportunities can be exhausting and intimidating. VolunTracker is our answer to that.
                </p>
            </div>
            <div className="card">
                <HiOutlineLightBulb size={100} id={'solutionIcon'}/>
                <h2> The Solution </h2>
                <p>
                    VolunTracker aims to solve both sides of the problem. VolunTracker allows anybody to create organizations. Organizations are home
                    to  volunteers and all the information they need to know. Events may be created for members to be a part of. As an organization
                    you have the ability to monitor who is in the organization and what events they have been/will be a part of. As a volunteer you have
                    the ability to monitor your activity including events joined, events participated in, hours of service, and so much more!
                </p>
                <br/>
                <p>
                    We want to provide a way for people to be more connected. A community is stronger when people are involved.
                </p>
            </div>
        </div>
    )
}

export default AboutUs
