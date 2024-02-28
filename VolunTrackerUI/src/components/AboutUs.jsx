import { useState } from 'react'
import '../App.css'
import { TbHeartHandshake } from "react-icons/tb";
import { MdOutlineReportProblem } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";

function AboutUs() {
    const [count, setCount] = useState(0)

    return (
        <div className="aboutCards">
            <div className="card">
                <TbHeartHandshake size={100} id={'missionIcon'}/>
                <h2> Mission and Vision </h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, ad aperiam assumenda corporis ea earum, error fuga ipsa ipsam ipsum itaque magnam maiores nobis officiis reprehenderit repudiandae suscipit ullam unde veniam voluptate! A aspernatur, odit provident quisquam sequi sunt. Alias, asperiores commodi consequuntur cum debitis dolorum eligendi est facere fugiat fugit, impedit inventore ipsam libero magni maxime nam perferendis quas quasi quidem quisquam reprehenderit sequi ullam. Accusamus autem dolore eum explicabo illum laudantium minus, perferendis, perspiciatis quos reprehenderit sint voluptates. Amet consequuntur eligendi, enim nam nesciunt nulla officiis reprehenderit saepe soluta, totam voluptas voluptate? Adipisci fugit incidunt laboriosam nostrum sunt.
                </p>
            </div>
            <div className="card">
                <MdOutlineReportProblem size={100} id={'problemIcon'}/>
                <h2> The Problem </h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, ad aperiam assumenda corporis ea earum, error fuga ipsa ipsam ipsum itaque magnam maiores nobis officiis reprehenderit repudiandae suscipit ullam unde veniam voluptate! A aspernatur, odit provident quisquam sequi sunt. Alias, asperiores commodi consequuntur cum debitis dolorum eligendi est facere fugiat fugit, impedit inventore ipsam libero magni maxime nam perferendis quas quasi quidem quisquam reprehenderit sequi ullam. Accusamus autem dolore eum explicabo illum laudantium minus, perferendis, perspiciatis quos reprehenderit sint voluptates. Amet consequuntur eligendi, enim nam nesciunt nulla officiis reprehenderit saepe soluta, totam voluptas voluptate? Adipisci fugit incidunt laboriosam nostrum sunt.
                </p>
            </div>
            <div className="card">
                <HiOutlineLightBulb size={100} id={'solutionIcon'}/>
                <h2> The Solution </h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, ad aperiam assumenda corporis ea earum, error fuga ipsa ipsam ipsum itaque magnam maiores nobis officiis reprehenderit repudiandae suscipit ullam unde veniam voluptate! A aspernatur, odit provident quisquam sequi sunt. Alias, asperiores commodi consequuntur cum debitis dolorum eligendi est facere fugiat fugit, impedit inventore ipsam libero magni maxime nam perferendis quas quasi quidem quisquam reprehenderit sequi ullam. Accusamus autem dolore eum explicabo illum laudantium minus, perferendis, perspiciatis quos reprehenderit sint voluptates. Amet consequuntur eligendi, enim nam nesciunt nulla officiis reprehenderit saepe soluta, totam voluptas voluptate? Adipisci fugit incidunt laboriosam nostrum sunt.
                </p>
            </div>
        </div>
    )
}

export default AboutUs
