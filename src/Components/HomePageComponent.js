import React, {useState, useEffect} from 'react';
import UserComponent from "./UserComponent";
import {BrowserRouter as Router,Route, Link} from "react-router-dom";
import NavBarComponent from "./NavBarComponent";
import RegisterComponent from "./RegisterComponent";
import DeleteComponent from "./DeleteComponent"
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePageComponent(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userInfo, setUserInfo] = useState([]);
    const [userEvents, setUserEvents] = useState([]);
    const [userCourses, setUserCourses] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [picture, setPicture] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [schoolStatus, setSchoolStatus] = useState("");
    const [studentId, setStudentId] = useState("");
    const [isStudent, setStudentStatus] = useState(true);
    const [tutors, setTutors] = useState([])


    useEffect(()=> {fetch("http://localhost:5000/students")
         .then(response => response.json())
        .then(data => setUserInfo(data))

        fetch("http://localhost:5000/tutors")
                 .then(response => response.json())
                .then(data => setTutors(data))

        }, []);


    function handleChange(event){
        if(event.target.name==="email"){
            setEmail(event.target.value)
        }
        if(event.target.name==="password"){
            setPassword(event.target.value)
        }

    }

     function handleClick(event){
         let user =userInfo.data.filter(item=>(email === item.email  && password ===  item.password));
         let loginUser = user[0];
         if(loginUser !== undefined){
         let eventUrl = "http://localhost:5000/events:" + loginUser.studentId;
                          let courseUrl = "http://localhost:5000/registration:" + loginUser.email
                          fetch(eventUrl)
                              .then(response => response.json())
                              .then(data => {setUserEvents(data.data)});
                          fetch(courseUrl)
                              .then(response => response.json())
                              .then(data => {setUserCourses(data.data.map(item=>({name:item.courseName})))});
                          setLoggedIn(true);
                          setLastName(loginUser.lastName);
                          setFirstName(loginUser.firstName);
                          setSchoolStatus(loginUser.status);
                          setPicture(loginUser.picture);
                          setStudentId(loginUser.studentId);
                          setStudentStatus(loginUser.isStudent);
         }

        }


    return(
        <Router>
            <Route path="/" exact render={()=>{return(
                <div>
                     <NavBarComponent/>
                                        <div className="outerBox">
                                            <div className="homepage-input">
                                            <h5 className="homepage-input-labels"> Email: </h5>
                                            <input type="text" name="email" placeholder="enter a valid email..." onChange={handleChange}/>
                                            </div>
                                            <div  className="homepage-input">
                                            <h5 className="homepage-input-labels"> Password: </h5>
                                            <input type="password" name="password" placeholder="enter your password" onChange={handleChange}/>
                                            </div>
                                            <br/>
                                            <div  className="homepage-input">
                                            <Link to={"/user"}>
                                                <button className="homepage-input-button" onClick={handleClick}> Login </button>
                                            </Link>
                                            <Link to="/register">
                                                <button className="homepage-input-button">register</button>
                                            </Link>
                                            </div>
                                        </div>
                                    </div>
            )}}
            />
            <Route path="/delete" exact component={DeleteComponent}/>
            <Route path="/register" exact component={RegisterComponent}/>
            <Route path="/user" exact render={()=>{return(<UserComponent
                email={email}
                events={userEvents}
                password={password}
                userCourses={userCourses}
                loggedIn={loggedIn}
                firstName={firstName}
                lastName={lastName}
                picture={picture}
                schoolStatus={schoolStatus}
                studentId={studentId}
                isStudent={isStudent}
                tutors={tutors}
            />)}}/>

        </Router>

    )

}
export default HomePageComponent



