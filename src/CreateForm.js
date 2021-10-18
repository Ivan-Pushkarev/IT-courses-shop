import React from 'react';
import {useHistory, withRouter} from "react-router-dom";
import InputsBlock from "./InputsBlock";

function CreateForm(props) {
    const {addNewCourse} = props
    const history = useHistory()
    const initialCourse ={
        id: Math.random(),
        name:'',
        description:'',
        price:'',
        date:'',
        avatar:''
    }
   
    return (
        <div className="create-edit">
            <div className="create-edit__title">Create course form</div>
            <InputsBlock initialCourse={initialCourse}
                         updateFunction={addNewCourse}
                         history={history}
                         create={true}/>
        
        </div>
    );
}

export default withRouter(CreateForm);