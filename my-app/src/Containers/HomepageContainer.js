import React, {useState, useEffect} from 'react';
import UserContainer from "../Containers/UserContainer"
import HomePageComponent from "../Components/HomePageComponent";
import {BrowserRouter as Router,Route} from "react-router-dom";
import RegisterContainer from "../Containers/RegisterContainer";

function HomepageContainer(){

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=> {fetch("https://swapi.co/api/people/1")
         .then(response => response.json())
        .then(data => setUserInfo(data))}, [])

    function handleChange(event){
        if(event.target.name==="email"){
            setUserName(event.target.value)
        }
        if(event.target.name==="password"){
            setPassword(event.target.value)
        }

    }

     function handleClick(event){
        if(userName === userInfo.name && password === userInfo.mass){
            setLoggedIn(true)
            console.log("logged in")
        }
    }

    return(
        <Router>
            <Route path="/" exact render={()=>{return (<HomePageComponent
                userName={userName}
                password={password}
                userInfo={userInfo}
                loggedIn={loggedIn}
                handleChange={handleChange}
                handleClick={handleClick}
            />)}}
            />
            <Route path="/register" exact component={RegisterContainer}/>
            <Route path="/user" exact render={()=>{return(<UserContainer
                userName={userName}
                password={password}
                userInfo={userInfo}
                loggedIn={loggedIn}
            />)}}/>

        </Router>

    )

}
export default HomepageContainer