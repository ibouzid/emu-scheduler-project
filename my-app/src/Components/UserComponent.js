import React, {useState, useEffect} from 'react';
import NavBarComponent from "./NavBarComponent";
import izzyFace from "../izzyface.jpg";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function UserComponent(props){
    console.log("props in usercomponent ")
    console.log(props)
if(props.loggedIn){
    return(
        <div>
            <NavBarComponent/>
            <div className="user-page">
                <div className="sideBar">
                    <div>
                        <label> Month
                            <input id="month" type="text" placeholder="XX"/>
                        </label><br/>
                        <label> Day
                            <input id="day" type="text" placeholder="XX"/>
                        </label><br/>
                        <label> Year
                            <input id="year" type="text" placeholder="XXXX"/>
                        </label><br/>
                        <label> Time
                            <input id="time" type="text" placeholder="10:00"/>
                        </label>
                    </div>
                    <button className="appointment-button" onClick={props.handleClick}>Add Appointment</button>
                    <div className="info-box">
                        <h2>{props.firstName} {props.lastName}</h2> <br/>
                        <img src={props.picture} className="facePic"/>
                        <label>email: {props.email}</label><br/>
                        <label>Status: {props.schoolStatus}</label><br/>

                    </div>

                    <div className="info-box">
                        <h2>Courses</h2>
                        <label>COMP SCI 441</label><br/>
                        <label>MATH 220</label><br/>
                    </div>
                </div>

                <div className="calendar">
                    <FullCalendar
                        defaultView="dayGridMonth"
                        plugins={[ dayGridPlugin ]}
                        events ={props.events}

                    />

                </div>
            </div>




        </div>
    )
} else{
    //alert("incorrect login information")
    return <div>Username and Password not found</div>
}

}

export default UserComponent