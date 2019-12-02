import React, {useState, useEffect} from 'react';
import NavBarComponent from "./NavBarComponent";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function UserContainer(props) {
    const [events, setEvents] = useState([]);
    useEffect(()=>{
        props.events.forEach(item=>{setEvents(prevState => [...prevState, item])})
    },[props.events]);

    function handleClick() {
        var day = document.getElementById("day").value;
        var month = document.getElementById("month").value;
        var year = document.getElementById("year").value;
        var date = year + "-" + month + "-" + day;
        var event = {
            title: document.getElementById("time").value,
            date: date
        };

        if(typeof(Number(day))!== "number" || day.length !== 2){
            alert("incorrect input " + day + " for day. Please input day in two digits...")
        }
        if(typeof(Number(month))!== "number" || month.length !== 2){
            alert("incorrect input " + month + " for month. Please input month in two digits...")
        }
        if(typeof(Number(year))!== "number" || year.length !== 4){
            alert("incorrect input " + year + " for year. Please input year in four digits...")
        }
        if(typeof(Number(day))=== "number" && typeof(Number(month))=== "number" && typeof(Number(year))=== "number"
            && day.length === 2 && month.length === 2 && year.length === 4){
            setEvents([...events, event]);
            alert("Appointment Succesfully Added on " + date);
            document.getElementById("day").value = "";
            document.getElementById("month").value  = "";
            document.getElementById("year").value = "";
            document.getElementById("time").value = "";
        }

    }

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
                        <button className="appointment-button" onClick={handleClick}>Add Appointment</button>
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


export default UserContainer





