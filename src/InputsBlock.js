import React, {useState} from 'react';

function InputsBlock(props) {
    const {initialCourse, updateFunction, history, create, editButtonHandler} = props
    const [course, setCourse] = useState(initialCourse)
    
    const handleChange = (e) => {
        setCourse({...course, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        updateFunction(course, course.id)
        if(create) history.push('/')
        else editButtonHandler()
    }
    
    return (
        <form className="create-edit-form">
            <div className="input-wrapper">
                <label htmlFor="name">Course Name</label>
                <input type="text" id="name" name="name"
                       value={course.name} onChange={handleChange}/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="description">Course Description</label>
                <textarea id="description" rows='4' name="description"
                          value={course.description} onChange={handleChange}/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="price">Course price</label>
                <input type="number" id="price" name="price"
                       value={course.price} onChange={handleChange}/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="date">Course start date</label>
                <input type="text" id="date" name="date"
                       value={course.date} onChange={handleChange}/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="avatar">Course avatar</label>
                <input type="text" id="avatar" name="avatar"
                       value={course.avatar} onChange={handleChange}/>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    );
}

export default InputsBlock;