import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import NavBarComponent from "./NavBarComponent";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import UserCourseComponent from "./UserCourseComponent";
import TutorsComponent from "./TutorsComponent";

function UserComponent(props) {

    const [events, setEvents] = useState([]);
    const [tutorId, setTutorId] = useState("");

    useEffect(()=>{
        if(props.isStudent){
            let getEventUrl = "http://localhost:5000/events:" + props.studentId;
            fetch(getEventUrl)
                .then(response => response.json())
                .then(data => {setEvents(data.data.map(item=>({
                    eventId: item.eventId,
                    tutorId: item.tutorId,
                    studentId: item.studentId,
                    title:item.title,
                    date:item.date})))});
        }else{
            let getEventUrl = "http://localhost:5000/events/tutor:" + props.studentId;
            fetch(getEventUrl)
                .then(response => response.json())
                .then(data => {setEvents(data.data.map(item=>({
                    eventId: item.eventId,
                    tutorId: item.tutorId,
                    studentId: item.studentId,
                    title:item.title,
                    date:item.date})))});

        }

    },[]);

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
            setEvents(prevState=> [...prevState,  {...event, studentId:props.studentId}]);
            alert("Appointment Succesfully Added on " + date);
            document.getElementById("day").value = "";
            document.getElementById("month").value  = "";
            document.getElementById("year").value = "";
            document.getElementById("time").value = "";

            fetch("http://localhost:5000/events", {
                method: 'POST',
                body: JSON.stringify({...event, studentId:props.studentId, tutorId:tutorId}),
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(response=>response.json())
                .then(data=>console.log(data))
                .catch(err=>console.log(err));

        }

    }
    function handleChange(event) {
        if(event.target.name==="tutors"){
            setTutorId(event.target.value)
        }

    }
    if(props.loggedIn){
        return(
            <div>
                <NavBarComponent/>
                <div className="user-page">
                    <div className="sideBar">
                        <div>
                            {(props.isStudent)?
                                <div>
                                    <label> Month
                                        <input id="month" type="text" placeholder="XX"/>
                                    </label>
                                    <label> Day
                                        <input id="day" type="text" placeholder="XX"/>
                                    </label>
                                    <label> Year
                                        <input id="year" type="text" placeholder="XXXX"/>
                                    </label>
                                    <label> Time
                                        <input id="time" type="text" placeholder="10:00"/>
                                    </label>
                                <label> Tutors:
                                    <select className="register-courses" name="tutors"  onChange={handleChange}>
                                        <option>Select a Tutor:</option>
                                        <TutorsComponent data={props.tutors}/>
                                    </select>
                                </label><div>
                                    <button className="appointment-button" onClick={handleClick}>Add Appointment</button>
                                    <Link to={{
                                        pathname: '/delete',
                                        state: {
                                            userCourses: props.userCourses,
                                            studentId:props.studentId,
                                            email: props.email,
                                            events:events,
                                            password:props.password,
                                            loggedIn:props.loggedIn,
                                            firstName:props.firstName,
                                            lastName:props.lastName,
                                            picture: props.picture,
                                            schoolStatus: props.schoolStatus
                                        }}}>
                                        <button className="delete-button">Delete Appointment</button>
                                    </Link>
                                </div></div> : <br/>}


                        </div>

                        <div className="info-box">
                            <h3>{props.firstName} {props.lastName}</h3> <br/>
                            <img src={props.picture} className="facePic"/>
                            <h5><b>Email:</b></h5> <h6>{props.email}</h6><br/>
                            <h5><b>Status:</b></h5>{(props.isStudent)? <h6>{props.schoolStatus}</h6> : <h6>Tutor</h6>}

                        </div>
                        {(props.isStudent)? <div className="info-box">
                            <h4><b>Courses</b></h4>
                            <UserCourseComponent data={props.userCourses}/>
                        </div> : <br/> }
                    </div>

                    <div>
                        <FullCalendar
                            defaultView="dayGridMonth"
                            plugins={[ dayGridPlugin ]}
                            events ={events}

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





