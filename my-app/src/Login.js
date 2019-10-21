import React from "react"
import ReactDOM from 'react-dom';
import Register from "./Register";

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            userName: "",
            password: "",
            userInfo:{}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    handleClick(event) {

        if(event.target.name === "login" &&
            this.state.userName === this.state.userInfo.name &&
            this.state.password === this.state.userInfo.mass){
            console.log("got here")
            event.history.push("/app")
            //ReactDOM.render(<App/>, document.getElementById('root'))
        }

        else if(event.target.name === "register"){
            ReactDOM.render(<Register/>, document.getElementById('root'))
        }
        else{
            ReactDOM.render(<Login/>, document.getElementById('root'))
        }
    }

    componentDidMount(){
            fetch("https://swapi.co/api/people/1")
                .then(response => response.json())
                .then(data => this.setState({
                    userInfo: data
                }));
    }

    render() {
        console.log("rendered")
        return (
            <form>
                <input value={this.state.userName} placeholder="enter username..." name="userName" onChange={this.handleChange}/>
                <input placeholder="enter password..." name="password" onChange={this.handleChange}/>
                <p>{this.state.userName} {this.state.password}</p>
                <button onClick={this.handleClick} name="login">Login</button>
                <button onClick={this.handleClick} name="register">Register</button>
            </form>
        )

    }

}

export default Login;