import React from 'react'
import { Link, useParams } from 'react-router-dom'

const ProjectItem = ({project, deleteProjects}) => {
    let lin = `/project/${project.id}`
    return (
        <tr>
            <td>
                <Link to={lin}>{project.name_proj}</Link>
            </td>
            <td>
                {project.repo_proj}
            </td>
            <td><button onClick={()=> deleteProjects(project.id)} type="button">Delete</button></td>

        </tr>
    )
}


const ProjectList = ({projects, deleteProjects}) => {
    // console.log(projects)
    // let {id} = useParams()
    // let filter_item = projects.filter((project => project.users_proj.includes(parseInt(id))))

    return (
        <div>
            <table>
                <th>
                    Project Name
                </th>
                <th>
                    URL Project
                </th>
                <th></th>
    
                {projects.map((project) => <ProjectItem project={project} deleteProjects={deleteProjects}/>)}
            </table>
            <Link to='/Projects/create'>Create</Link>
        </div>
    )
}




export default ProjectList