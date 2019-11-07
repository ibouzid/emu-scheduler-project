import React, {useState, useEffect} from 'react';
import RegisterComponent from "../Components/RegisterComponent";

function RegisterContainer(){

    const [firstName, setUserName] = useState("");
    const [lastName, setPassword] = useState("");

    const [password, setLoggedIn] = useState("false");
    const [isStudent, setStatus] = useState(true);

    function handleSubmit(event) {


    }

    function handleChange(event){
        setStatus(!isStudent)
    }
    return(
        <RegisterComponent
        isStudent={isStudent}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        />
    )


}
export default RegisterContainer