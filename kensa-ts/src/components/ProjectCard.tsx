import * as React from "react";

type ProjectCardPropsType = {
    projectName: string,
    projectId: number,
    apiKey: string
}

const ProjectCard = (props:ProjectCardPropsType) => {
    return (
        <div className="project-cards">
            <a href={`../monitor/${props.projectId}`}>
                <h3>{props.projectName}</h3>
            </a>
        </div>
    );
};

export default ProjectCard;