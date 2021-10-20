import React from 'react';
import {useHistory, withRouter} from "react-router-dom";

function Course(props) {
    const {course} = props
    const history = useHistory()
    return (
        <div className="course">
            <div className="course__avatar">
                <img src={course.avatar} alt={course.name} onClick={()=>history.push(`/course/${course.id}`)}/>
            </div>
            <div className="course__text-block">
                <div className="text-item">
                    <div className="text-item-title">Course name:</div>
                    <div className="text-item-description"><span>{course.name}</span></div>
                </div>
                <div className="text-item">
                    <div className="text-item-title">Description:</div>
                    <div className="text-item-description">{course.description}</div>
                </div>
                <div className="text-item">
                    <div className="text-item-title">Price:</div>
                    <div className="text-item-description">{course.price}$</div>
                </div>
                <div className="text-item">
                    <div className="text-item-title">Start date:</div>
                    <div className="text-item-description">{course.date}</div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Course);