import React from "react"

function TutorsComponent(props){
    let data = props.data.data.map(item=>{
        return(<option key={item.studentId}  name={item.studentId} value={item.studentId} >
            {item.firstName}  {item.lastName} - {item.email}
        </option>)

    })

    return(data)
}

export default TutorsComponent