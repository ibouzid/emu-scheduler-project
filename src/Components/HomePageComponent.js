import React, {useState, useEffect} from 'react';
import UserContainer from "./UserContainer";
import {BrowserRouter as Router,Route, Link} from "react-router-dom";
import NavBarComponent from "./NavBarComponent";
import RegisterContainer from "./RegisterContainer";

function StartingPageComponent(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userInfo, setUserInfo] = useState([]);
    const [userEvents, setUserEvents] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [picture, setPicture] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [schoolStatus, setSchoolStatus] = useState("");

    useEffect(()=> {fetch("http://localhost:5000/students")
         .then(response => response.json())
        .then(data => setUserInfo(data))}, []);



    function handleChange(event){
        if(event.target.name==="email"){
            setEmail(event.target.value)
        }
        if(event.target.name==="password"){
            setPassword(event.target.value)
        }

    }

     function handleClick(event){
         userInfo.data.forEach(element=> {
             if(email === element.email  && password ===  element.password){
                 let eventUrl = "http://localhost:5000/events:" + element.studentId;
                 fetch(eventUrl)
                     .then(response => response.json())
                     .then(data => {setUserEvents(data.data.map(item=>({title:item.title, date:item.date})))});
                 setLoggedIn(true);
                 setLastName(element.lastName);
                 setFirstName(element.firstName);
                 setSchoolStatus(element.status);
                 setPicture(element.picture);
             }
         });

        }


    return(
        <Router>
            <Route path="/" exact render={()=>{return(
                <div>
                    <NavBarComponent/>
                    <div className="outerBox">
                        <div className="register-input">
                        <label> Email: </label>
                        <input type="text" name="email" placeholder="enter a valid email..." onChange={handleChange}/>
                        </div>

                        <div  className="register-input">
                        <label> Password: </label>
                        <input type="password" name="password" placeholder="enter your password" onChange={handleChange}/>
                        </div>

                        <div  className="register-input">
                        <Link to={"/user"}>
                            <button onClick={handleClick}> Login </button>
                        </Link>
                        <Link to="/register">
                            <button>register</button>
                        </Link>
                        </div>
                    </div>
                </div>
            )}}
            />
            <Route path="/register" exact component={RegisterContainer}/>
            <Route path="/user" exact render={()=>{return(<UserContainer
                email={email}
                events={userEvents}
                password={password}
                userInfo={userInfo.data}
                loggedIn={loggedIn}
                firstName={firstName}
                lastName={lastName}
                picture={picture}
                schoolStatus={schoolStatus}
            />)}}/>

        </Router>

    )

}
export default StartingPageComponent