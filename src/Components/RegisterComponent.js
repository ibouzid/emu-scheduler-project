import React, {useState, useEffect} from 'react';
import CourseOptionComponent from "./CourseOptionComponent";
import {Link} from "react-router-dom";
import NavBarComponent from "./NavBarComponent";

function RegisterComponent(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [schoolStatus, setSchoolStatus]  = useState("");
    const [password, setPassword] = useState("false");
    const [isStudent, setStatus] = useState(true);
    const [courses, setCourses] = useState([])
    const [studentCourses, setStudentCourses] = useState([])

    useEffect(()=> {fetch("http://localhost:5000/courses")
        .then(response => response.json())
        .then(data => setCourses(data.data.map(item=>({name:item.name}))))}, []);



    function handleSubmit(event) {
        let user = {
            email: email,
            password:password,
            firstName: firstName,
            lastName: lastName,
            isStudent: isStudent,
            studentCourses: studentCourses,
            status: schoolStatus

        };
            fetch("http://localhost:5000/students", {
                method: 'POST',
                body: JSON.stringify(user),
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(response=>response.json())
                .then(data=>console.log(data))
                .catch(err=>console.log(err));
            alert("Student Registration Successful!")


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
        if(event.target.name === "courses") {
            let courseArray = [...event.target.options]
            let newArray = courseArray.filter(item => item.selected).map(item=>{return{name:item.value}})
            setStudentCourses(newArray)
        }
        if(event.target.name === "schoolStatus"){
            setSchoolStatus(event.target.value)
        }
    }
    function handleRadioChange(event){
        setStatus(!isStudent)
    }
    return(
        <div className="container">
            <NavBarComponent/>
            <div className="jumbotron">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label> First Name:
                <input className="form-control" name ="firstName" placeholder="First Name..." onChange={handleChange}/>
            </label>
            </div>

            <div className="form-group">
            <label> Last Name:
                <input className="form-control" name="lastName" placeholder="Last Name..." onChange={handleChange}/>
            </label>
            </div>

            <div className="form-group">
            <label> Password:
                <input className="form-control" name="password" placeholder="Password..." onChange={handleChange}/>
            </label>
            </div>

            <div className="form-group">
            <label> Email:
                <input className="form-control" name="email" placeholder="Email..." onChange={handleChange}/>
            </label>
            </div>

            <div className="form-group">
            <label> Student:
                <input className="form-control" type="radio" name="status" value="student" checked={isStudent === true} onChange={handleRadioChange}/>
            </label>

            <label> Tutor:
                <input className="form-control" type="radio" name="status" value="tutor"  checked={isStudent === false} onChange={handleRadioChange}/>
            </label>
            </div>
            {(isStudent) ?
                <div>
                    <div className="container">
                <label className="row"> Courses: </label>
                    <select className="form-group" name="courses" multiple={true} onChange={handleChange}>
                        <CourseOptionComponent data ={courses}/>
                    </select>
                    </div>
                    <div>
                <label> Status:
                    <select name="schoolStatus" placeholder="" onChange={handleChange}>
                        <option value="none" selected={true}> Select Status</option>
                        <option name="freshman" > Freshman</option>
                        <option name="sophmore"> Sophmore</option>
                        <option name="junior"> Junior</option>
                        <option name="senior"> Senior</option>
                    </select>
                </label>
                    </div>

            </div> : <></> }

            <div className="register-input">
            <Link to="/">
                <button className="register-input-button" type="submit" onClick={handleSubmit}>Submit</button>
            </Link>
            <Link to="/">
                <button>Cancel</button>
            </Link>
            </div>
        </form>
            </div>
        </div>
    )


}
export default RegisterComponent