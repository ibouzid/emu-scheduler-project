import React from "react"
import NavBarComponent from "./NavBarComponent";

function UserComponent(props){
    console.log(props)
    console.log(props.userInfo.userName)
    return(
        <div>
            <NavBarComponent/>
            <div className="user-page">
                <div className="sideBar">
                    <button className="appointment-button" onClick={props.handleClick}>Add Appointment</button>
                        <div className="info-box">
                            <label>{props.userName}</label> <br/>
                            <label>{props.userInfo.hair_color}</label><br/>
                            <label>{props.userInfo.eye_color}</label><br/>

                        </div>

                        <div className="info-box">
                            <label>{props.userInfo.skin_color}</label><br/>
                            <label>{props.userInfo.mass}</label><br/>
                        </div>
                </div>

                <div className="calendar">
                    Calendar Stuff goes here

                </div>
            </div>




        </div>
    )
}

export default UserComponent