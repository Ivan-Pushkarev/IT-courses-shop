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
import initialList from "./mocklist";


function App() {
    const [list, setList] = useState(initialList)
    
    const addNewCourse = (course) => {
        const newList = [...list, course]
        setList(newList)
    }
    
    const updateCourseById = (id, course) => {
        const newList = list.map(el=>el.id===id ? {...course}:el)
        setList(newList)
    }
    
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
                            <CoursePage list={list} updateCourseById={updateCourseById}/>
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
