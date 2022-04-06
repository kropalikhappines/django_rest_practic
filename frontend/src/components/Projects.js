import React from 'react'
import { Link, useParams } from 'react-router-dom'

const ProjectItem = ({project}) => {
    let lin = `/project/${project.id}`
    return (
        <tr>
            <td>
                <Link to={lin}>{project.name_proj}</Link>
            </td>
            <td>
                {project.repo_proj}
            </td>
            {/* <td>
                {project.users_proj}
            </td> */}
        </tr>
    )
}


const ProjectList = ({projects}) => {
    // console.log(projects)
    // let {id} = useParams()
    // let filter_item = projects.filter((project => project.users_proj.includes(parseInt(id))))

    return (
        <table>
            <th>
                Project Name
            </th>
            <th>
                URL Project
            </th>
 
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}




export default ProjectList