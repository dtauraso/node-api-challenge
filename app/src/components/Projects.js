import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Project from './Project'
const Projects = () => {

    let [projects, setProjects] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/api/actions/')
        .then(res => {
            console.log(res)
            setProjects(res.data)
        })
    }, [])

    return (
        <div>
            {projects.map((project, i) => (
                <Project key={i} project={project}/>
            ))}
        </div>
    )
}
export default Projects