import React, {useState, useEffect} from 'react';
import UserComponent from "../Components/UserComponent"

function UserContainer(props){

function handleClick(){

}
if(props.loggedIn){
    return(
        <UserComponent
            userName={props.userName}
            password={props.password}
            userInfo={props.userInfo}
            loggedIn={props.loggedIn}
            handleClick={handleClick}
        />

    )
} return <div>Error: Must Log in</div>


}

export default UserContainer





