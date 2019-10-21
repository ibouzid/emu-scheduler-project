import React from "react"

function RegisterContainer(){

}

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            status: "student"
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        (event.target.value === "student") ? this.setState(
            {status: "student"}
        ) : this.setState({
            status: "tutor"
        })
        console.log(this.state)
    }
    render(){
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
}

export default Register;