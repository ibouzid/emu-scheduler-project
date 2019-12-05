import React, {useState, useEffect} from 'react';
import EventOptionComponent from "./EventOptionComponent";
import {Link} from "react-router-dom";

function DeleteComponent(props){
    const [studentEvents, setStudentEvents] = useState([])
    const [eventId, setEventId] = useState("")

    useEffect(()=>{
        let getEventUrl = "http://localhost:5000/events:" + props.location.state.studentId;
        fetch(getEventUrl)
            .then(response => response.json())
            .then(data => {setStudentEvents(data.data.map(item=>({
                eventId: item.eventId,
                studentId: item.studentId,
                title:item.title,
                date:item.date})))});
        //props.events.forEach(item=>{setEvents(prevState => [...prevState, item])})
    },[studentEvents]);
    console.log(studentEvents)

    function handleChange(event){
        if(event.target.name === "events") {
            setEventId(event.target.value)
            //let eventArray = [...event.target.options]
            //let newArray = eventArray.filter(item => item.selected).map(item=>{return{eventId:item.value}})
            //setDeleteEvents(newArray)
        }
    }
     function handleClick(){
            let eventUrl = "http://localhost:5000/events"
            fetch(eventUrl, {
                method: 'DELETE',
                body: JSON.stringify({eventId:eventId}),
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => res.json())
                .then(res => console.log(res))


    }


    return(
        <div>
           <h1>Select Events to Delete</h1>
                <select className="register-courses" name="events"  onChange={handleChange}>
                    <option>Select an appointment</option>
                    <EventOptionComponent data ={studentEvents}/>
                </select>
            <Link to={{
                pathname: '/user',
                state: {
                    userCourses: props.userCourses,
                    studentId: props.studentId,
                    email: props.email,
                    password:props.password,
                    userInfo:props.userInfo,
                    loggedIn:props.loggedIn,
                    firstName:props.firstName,
                    lastName:props.lastName,
                    picture: props.picture,
                    schoolStatus: props.schoolStatus
                }}}>
            <button onClick={handleClick}> Delete</button>
            </Link>
        </div>
    )

}

export default DeleteComponent