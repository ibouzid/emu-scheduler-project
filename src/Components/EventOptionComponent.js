import React from "react"

function CourseOptionComponent(props){
    let data = props.data.map(item=>{
        return(<option key={item.title} date={item.date} name={item.date} value={item.eventId} >
            {item.title} - ({item.date})
        </option>)

    })

    return(data)
}

export default CourseOptionComponent