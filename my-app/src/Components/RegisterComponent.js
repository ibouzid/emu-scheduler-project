import React from "react"
import {Link} from "react-router-dom";

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
            {(props.isStudent) ? <div><select>
                                        <option>Chemistry</option>
                                        <option>Biology</option>
                                        </select><br/></div> : <br/> }
            <Link to="/">
                <button>Register</button>
            </Link>
            <Link to="/">
                <button>Cancel</button>
            </Link>

        </form>
    )
}
export default RegisterComponent