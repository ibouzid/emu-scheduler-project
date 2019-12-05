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
        <div>
            <NavBarComponent/>
        <form onSubmit={handleSubmit}>
            <div className="register-input">
            <label> First Name:
                <input name ="firstName" placeholder="First Name..." onChange={handleChange}/>
            </label>
            </div>

            <div className="register-input">
            <label> Last Name:
                <input name="lastName" placeholder="Last Name..." onChange={handleChange}/>
            </label>
            </div>

            <div className="register-input">
            <label> Password:
                <input name="password" placeholder="Password..." onChange={handleChange}/>
            </label>
            </div>

            <div className="register-input">
            <label> Email:
                <input name="email" placeholder="Email..." onChange={handleChange}/>
            </label>
            </div>

            <div className="register-input">
            <label> Student:
                <input type="radio" name="status" value="student" checked={isStudent === true} onChange={handleRadioChange}/>
            </label>

            <label> Tutor:
                <input type="radio" name="status" value="tutor"  checked={isStudent === false} onChange={handleRadioChange}/>
            </label>
            </div>
            {(isStudent) ? <div className="register-input">
                <label> Courses
                    <select className="register-courses" name="courses" multiple={true} onChange={handleChange}>
                        <CourseOptionComponent data ={courses}/>
                    </select></label>
                <br/>
                <label> Status:
                    <select name="schoolStatus" placeholder="" onChange={handleChange}>
                        <option value="none" selected={true}> Select Status</option>
                        <option name="freshman" > Freshman</option>
                        <option name="sophmore"> Sophmore</option>
                        <option name="junior"> Junior</option>
                        <option name="senior"> Senior</option>
                    </select>
                </label>

            </div> : <br/> }

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
    )


}
export default RegisterComponent