import React from "react"
import {BrowserRouter as Router,Route, Link} from "react-router-dom";


function HomePageComponent(props){

    return(
            <div>
               <div>
                   <label> Email:
                       <input type="text" name="email" placeholder="enter a valid email..." onChange={props.handleChange}/>
                   </label>
                   <br/>
                   <label> Password:
                       <input type="password" name="password" placeholder="enter your password" onChange={props.handleChange}/>
                   </label>
                     <br/>
                   <Link to={"/user"}>
                    <button onClick={props.handleClick}> Login </button>
                   </Link>
                     <br/>
                   <Link to="/register">
                        <button>register</button>
                   </Link>

               </div>
             </div>
       )

}

export default HomePageComponent