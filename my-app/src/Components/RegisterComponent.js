import React from "react"

function RegisterComponent() {
    return(
        <form>
            <label> Username:
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
                <input type="radio" name="status" value="student" checked={this.state.status === "student"} onChange={this.handleChange}/>
            </label>
            <label> Tutor:
                <input type="radio" name="status" value="tutor"  checked={this.state.status === "tutor"} onChange={this.handleChange}/>
            </label>

        </form>
    )
}
export default RegisterComponent