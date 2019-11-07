import React from "react"
import {Link} from "react-router-dom";
import data from "../Data"
import CourseOptionComponent from "./CourseOptionComponent";

function RegisterComponent(props) {
    return(
        <form>
            <label> First Name:
                <input placeholder="userName"/>
            </label>
            <br/>
            <label> Last Name:
                <input placeholder="userName"/>
            </label>
            <br/>
            <label> Password:
                <input placeholder="password"/>
            </label>
            <br/>
            <label> Email:
                <input placeholder="email"/>
            </label>
            <br/>
            <label> Student:
                <input type="radio" name="status" value="student" checked={props.isStudent === true} onChange={props.handleChange}/>
            </label>
            <label> Tutor:
                <input type="radio" name="status" value="tutor"  checked={props.isStudent === false} onChange={props.handleChange}/>
            </label>
            <br/>
            {(props.isStudent) ? <div>
                <label> Courses
                                    <select>
                                        <CourseOptionComponent data ={data}/>
                                    </select></label>
                            <br/></div> : <br/> }
            <Link to="/">
                <button onClick={props.handleSubmit}>Submit</button>
            </Link>
            <Link to="/">
                <button>Cancel</button>
            </Link>
        </form>
    )
}
export default RegisterComponent