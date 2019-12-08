import React from "react"

function CourseOptionComponent(props){
    let data = props.data.map(item=>{
        return(<option className="form-control" key={item.courseId} value={item.name} >

            {item.name}
        </option>)

    })

    return(data)
}

export default CourseOptionComponent