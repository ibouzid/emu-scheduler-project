import React, {useState, useEffect} from 'react';
import CourseOptionComponent from "./CourseOptionComponent";
import {Link} from "react-router-dom";

function RegisterContainer(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [schoolStatus, setSchoolStatus]  = useState("");
    const [password, setPassword] = useState("false");
    const [isStudent, setStatus] = useState(true);
    const [studentCourses, setStudentCourses] = useState([])
    const [courses, setCourses] = useState([])

    useEffect(()=> {fetch("http://localhost:5000/courses")
        .then(response => response.json())
        .then(data => setCourses(data.data.map(item=>({name:item.name}))))}, []);

    function handleSubmit(event) {
        let student = {
            email: email,
            password:password,
            firstName: firstName,
            lastName: lastName,
            isStudent: (isStudent)?"student":"tutor",
            studentCourses: studentCourses,
            status: schoolStatus


        };
        console.log(JSON.stringify(student));
        event.preventDefault();
        fetch("http://localhost:5000/students", {
            method: 'post',
            body: JSON.stringify(student),
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response=>response.json())
            .then(data=>console.log(data));

    }
    function handleChange(event) {
        if (event.target.name === "firstName") {
            setFirstName(event.target.value)
        }
        if (event.target.name === "lastName") {
            setLastName(event.target.value)
        }
        if (event.target.name === "password") {
            setPassword(event.target.value)
        }
        if (event.target.name === "email") {
            setEmail(event.target.value)
        }

        if(event.target.name === "schoolStatus"){
            setSchoolStatus(event.target.value)
        }
    }
    function handleRadioChange(event){
        setStatus(!isStudent)
    }
    return(
        <form onSubmit={handleSubmit}>
            <label> First Name:
                <input name ="firstName" placeholder="First Name..." onChange={handleChange}/>
            </label>
            <br/>
            <label> Last Name:
                <input name="lastName" placeholder="Last Name..." onChange={handleChange}/>
            </label>
            <br/>
            <label> Password:
                <input name="password" placeholder="Password..." onChange={handleChange}/>
            </label>
            <br/>
            <label> Email:
                <input name="email" placeholder="Email..." onChange={handleChange}/>
            </label>
            <br/>
            <label> Student:
                <input type="radio" name="status" value="student" checked={isStudent === true} onChange={handleRadioChange}/>
            </label>
            <label> Tutor:
                <input type="radio" name="status" value="tutor"  checked={isStudent === false} onChange={handleRadioChange}/>
            </label>
            <br/>
            {(isStudent) ? <div>
                <label> Courses
                    <select name="courses" multiple={true} onChange={handleChange}>
                        <CourseOptionComponent data ={courses}/>
                    </select></label>
                <br/>
                <label> Status:
                    <select name="schoolStatus" onChange={handleChange}>
                        <option name="freshman"> Freshman</option>
                        <option name="sophmore"> Sophmore</option>
                        <option name="junior"> Junior</option>
                        <option name="senior"> Senior</option>
                    </select>
                </label>
                <br/></div> : <br/> }
            <Link to="/">
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </Link>
            <Link to="/">
                <button>Cancel</button>
            </Link>
        </form>
    )


}
export default RegisterContainer