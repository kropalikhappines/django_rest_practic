import React from 'react'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name_proj}
            </td>
            <td>
                {project.repo_proj}
            </td>

            
            
        </tr>
    )
}


const ProjectList = ({projects}) => {
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