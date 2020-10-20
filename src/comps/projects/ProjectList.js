import React from 'react';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom'

const ProjectList = ({projects}) => {
    const listProjects = projects && projects.map(project => {
        return (
            <Link to={'/project/' + project.id} key={project.id} >
                <ProjectSummary project={project} />
            </Link>
            )
        }
);

    return (
        <div className="project-list section">
            { listProjects }
        </div>
        
        
    )
}

export default ProjectList