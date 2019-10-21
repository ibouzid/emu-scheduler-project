import React from "react"

function User(props) {
if(props.loggedIn){
    return(
        <div>Logged in</div>
    )
}
return(
    <div>Error Must Log In</div>
)

}

export default User