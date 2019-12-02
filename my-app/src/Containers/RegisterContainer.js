import React, {useState, useEffect} from 'react';
import RegisterComponent from "../Components/RegisterComponent";

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
        <RegisterComponent
        isStudent={isStudent}
        handleChange ={handleChange}
        handleRadioChange={handleRadioChange}
        handleSubmit={handleSubmit}
        courses={courses}
        />
    )


}
export default RegisterContainer