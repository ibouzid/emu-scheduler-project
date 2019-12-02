import React, {useState, useEffect} from 'react';
import UserContainer from "../Containers/UserContainer"
import HomePageComponent from "../Components/HomePageComponent";
import {BrowserRouter as Router,Route} from "react-router-dom";
import RegisterContainer from "../Containers/RegisterContainer";

function HomepageContainer(){

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
            <Route path="/" exact render={()=>{return (<HomePageComponent
                email={email}
                password={password}
                userInfo={userInfo}
                loggedIn={loggedIn}
                handleChange={handleChange}
                handleClick={handleClick}
            />)}}
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
export default HomepageContainer