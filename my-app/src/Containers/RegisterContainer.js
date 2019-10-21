import React from "react"
import RegisterComponent from "../Components/RegisterComponent";

function RegisterContainer(){

    const [firstName, setUserName] = useState("");
    const [lastName, setPassword] = useState("");
    const [email, setUserInfo] = useState("");
    const [password, setLoggedIn] = useState("false");
    const [isStudent, setStatus] = useState(true);

    return(
        <RegisterComponent/>
    )


}