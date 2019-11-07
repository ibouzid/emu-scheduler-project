import React from "react"
import {BrowserRouter as Router,Route, Link} from "react-router-dom";
import NavBarComponent from "./NavBarComponent"


function HomePageComponent(props){

    return(
            <div>
                <NavBarComponent/>
               <div className="outerBox">

                   <label> Email: </label>
                   <input type="text" name="email" placeholder="enter a valid email..." onChange={props.handleChange}/>
                   <br/>

                   <label> Password: </label>
                   <input type="password" name="password" placeholder="enter your password" onChange={props.handleChange}/>
                   <br/>

                   <Link to={"/user"}>
                        <button onClick={props.handleClick}> Login </button>
                   </Link>
                   <Link to="/register">
                        <button>register</button>
                   </Link>

               </div>
             </div>
       )

}

export default HomePageComponent