import React from "react"

function UserCourseComponent(props){
    let data = props.data.map(item=>{
        return(<h6>
            {item.name}
        </h6>)

    })

    return(data)
}

export default UserCourseComponent