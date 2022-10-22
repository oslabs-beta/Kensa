import * as React from "react";
import { useNavigate } from "react-router-dom";

import ProjectCard from "./ProjectCard";

const Projects = () => {
    let navigate = useNavigate();
    const toAddProjectPage = () => {
        const path = 'new';
        navigate(path);
    }

    return (
        <div className="secondary-container">
            <h2>My Projects</h2>
            <ProjectCard />

            {/* Add Project Button */}
            <button onClick={toAddProjectPage}>+</button>
        </div>
    );
};

export default Projects;