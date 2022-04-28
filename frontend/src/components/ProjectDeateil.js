import React from 'react'
import { useParams } from 'react-router-dom'


const ProjItem = ({project, users, putProjects}) => {
    
    return (
        <tr>
            <div>
                ID:         {project.id}
            </div>
            <div>
                Name project:        {project.name_proj}
            </div>
            <div>
                Users:              {project.users_proj}
            </div>
            <div>
                URL Project:  <a href={project.repo_proj}>{project.repo_proj}</a>
            </div>
            <div><button onClick={()=> putProjects(project.id)} type="button">Put</button></div>

            
        </tr>
    )
}


const ProjItemList = ({projects, putProjects}) => {
    let {id} = useParams()
    // console.log(projects)
    let filter_item = projects.filter((project => parseInt(project.id) === parseInt(id)))
    // console.log(filter_item)
    // console.log(projects)
    return (
        <div>
        {/* //     <div>
        //         ID:
        //     </div>
        //     <div>
        //         Name project:
        //     </div>
        //     <div>
        //         Users:
        //     </div>
        //     <div>
        //         URL Project:
        //     </div> */}
            {filter_item.map((project) => <ProjItem project={project} putProjects={putProjects}/>)}
        </div>
    )
}



export default ProjItemList