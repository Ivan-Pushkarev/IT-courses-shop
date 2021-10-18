import React, {useState} from 'react';
import {useHistory, withRouter} from "react-router-dom";
import InputsBlock from "./InputsBlock";

function CoursePage(props) {
    const {list, updateCourseById, deleteCourseById} = props
    const [edit, setEdit]= useState(false)
    const courseId = +props.match.params.courseId
  
    const initialCourse = list.find(el=>el.id===courseId)
    const history = useHistory()
    
    const deleteButtonHandler = () => {
        deleteCourseById(courseId)
        history.push('/')
    }
    
    const editButtonHandler = () => {
        setEdit(prev=>!prev)
    }
   
    return (
        <div className="create-edit">
            <div className="create-edit__title">{initialCourse.name}</div>
            <div className="selected-course">
                <div className="avatar">
                    <img src={initialCourse.avatar} alt="course avatar"/>
                </div>
                <div className="text-block">
                    <div className="text-item">
                        <div className="text-item-title">Description:</div>
                        <div className="text-item-description">{initialCourse.description}</div>
                    </div>
                    <div className="text-item">
                        <div className="text-item-title">Price: </div>
                        <div className="text-item-description">{initialCourse.price}$</div>
                    </div>
                    <div className="text-item">
                        <div className="text-item-title">Start date: </div>
                        <div className="text-item-description">{initialCourse.date}</div>
                    </div>
                </div>
            </div>
            <div className="buttons-wrapper">
                <button onClick={editButtonHandler}>Edit course</button>
                <button onClick={deleteButtonHandler}>Delete course</button>
            </div>
            {
                edit && <InputsBlock initialCourse={initialCourse}
                                     updateFunction={updateCourseById}
                                     history={history}
                                     editButtonHandler={editButtonHandler}/>
              
            }
        </div>
    );
}

export default withRouter(CoursePage);