import React from "react"

function CourseOptionComponent(props){
    let data = props.data.map(item=>{
        return(<option key={item.id} value={item.courseName} >
            {item.courseName}
        </option>)

    })

    return(data)
}

export default CourseOptionComponent