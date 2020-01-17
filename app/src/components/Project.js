import React from 'react'


const Project = (props) => {

    const { description, notes, completed } = props.project
    return (
        <div>
            <p>{description}</p>
            <p>{notes}</p>
            <p>{completed}</p>

        </div>
    )
}

export default Project;