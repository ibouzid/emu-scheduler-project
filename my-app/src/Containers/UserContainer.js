import React, {useState, useEffect} from 'react';
import UserComponent from "../Components/UserComponent"

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
            alert("incorrect input " + day + " for day. Please input day in two digits...i.e 07")
        }
        if(typeof(Number(month))!== "number" || month.length !== 2){
            alert("incorrect input " + month + " for month. Please input month in two digits...i.e 07")
        }
        if(typeof(Number(year))!== "number" || year.length !== 4){
            alert("incorrect input " + year + " for year. Please input year in four digits...i.e 2019")
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

    return (
        <UserComponent
            email={props.email}
            firstName={props.firstName}
            lastName={props.lastName}
            loggedIn={props.loggedIn}
            handleClick={handleClick}
            events ={events}
            picture={props.picture}
            schoolStatus={props.schoolStatus}
        />

    )
}


export default UserContainer





