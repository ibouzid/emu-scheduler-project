import React from "react"
import {Link} from "react-router-dom";
import CourseOptionComponent from "./CourseOptionComponent";

function RegisterComponent(props) {
    return(
        <form onSubmit={props.handleSubmit}>
            <label> First Name:
                <input name ="firstName" placeholder="First Name..." onChange={props.handleChange}/>
            </label>
            <br/>
            <label> Last Name:
                <input name="lastName" placeholder="Last Name..." onChange={props.handleChange}/>
            </label>
            <br/>
            <label> Password:
                <input name="password" placeholder="Password..." onChange={props.handleChange}/>
            </label>
            <br/>
            <label> Email:
                <input name="email" placeholder="Email..." onChange={props.handleChange}/>
            </label>
            <br/>
            <label> Student:
                <input type="radio" name="status" value="student" checked={props.isStudent === true} onChange={props.handleRadioChange}/>
            </label>
            <label> Tutor:
                <input type="radio" name="status" value="tutor"  checked={props.isStudent === false} onChange={props.handleRadioChange}/>
            </label>
            <br/>
            {(props.isStudent) ? <div>
                <label> Courses
                                    <select name="courses" multiple={true} onChange={props.handleChange}>
                                        <CourseOptionComponent data ={props.courses}/>
                                    </select></label>
                <br/>
                <label> Status:
                    <select name="schoolStatus" onChange={props.handleChange}>
                        <option name="freshman"> Freshman</option>
                        <option name="sophmore"> Sophmore</option>
                        <option name="junior"> Junior</option>
                        <option name="senior"> Senior</option>
                    </select>
                </label>
                            <br/></div> : <br/> }
            <Link to="/">
                <button type="submit" onClick={props.handleSubmit}>Submit</button>
            </Link>
            <Link to="/">
                <button>Cancel</button>
            </Link>
        </form>
    )
}
export default RegisterComponent