import React from 'react';

const ProjectSummary = ({project}) => {
    return (
        <div className="container">
            <div className="card box z-depth-0 project-summary">
                <div className="card-content yellow z-depth-1 red-text text-lighten-2">
                    <span className="card-title ">{project.goal}</span>
                    <span className="truncate">{project.nuggets}</span>
                </div>
          </div>
        </div>
    )

}

export default ProjectSummary