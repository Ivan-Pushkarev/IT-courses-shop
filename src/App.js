import './App.css';
import {
    BrowserRouter as Router, BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import CreateForm from "./CreateForm";
import CoursePage from "./CoursePage";
import Home from "./Home";
import {useState} from "react";
import mockList from "./mocklist";

const initialList = JSON.parse(sessionStorage.getItem('courses'))||mockList

function App() {
    const [list, setList] = useState(initialList)
    
    const addNewCourse = (course) => {
        const newList = [...list, course]
        setList(newList)
    }
    
    const updateCourseById = (course, id) => {
        const newList = list.map(el=>el.id===id ? {...course}:el)
        setList(newList)
    }
    
    const deleteCourseById = (id) => {
        const newList = list.filter(el=>el.id!==id)
        setList(newList)
    }
    
    sessionStorage.setItem('courses', JSON.stringify(list))
    
    return (
        <BrowserRouter>
            <Router>
                <div className="App">
                    <header>
                        <h1>Welcome to IT courses store</h1>
                        <div className="navbar">
                            <Link to="/" className="navbar__links">Home</Link>
                            <Link to="/create-new-course" className="navbar__links">CreateForm</Link>
                        </div>
                    </header>
                   
                    <Switch>
                        <Route path ='/create-new-course'>
                         <CreateForm addNewCourse={addNewCourse}/>
                        </Route>
                        <Route path ='/course/:courseId'>
                            <CoursePage list={list}
                                        updateCourseById={updateCourseById}
                                        deleteCourseById={deleteCourseById}/>
                        </Route>
                        <Route path ='/'>
                            <Home list={list}/>
                        </Route>
                    </Switch>
                
                </div>
            </Router>
        </BrowserRouter>
    );
}

export default App;
