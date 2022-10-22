import * as React from "react";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
    let navigate = useNavigate();
    const backToUserPage = () => {
        const path = '../user';
        navigate(path);
    }

    const toMonitorPage = () => {
        const path = '../monitor';
        navigate(path);
    }

    return (
        <div>
            <h2>Add Project</h2>
            <form id="add-project-form">
                <label htmlFor="projectName">Project Name:</label>
                <input type="text" name="projectName"/>
                <br />
                <label htmlFor="projectName">Default URL:</label>
                <input type="text" name="projectName"/>
                <br />
                <button onClick={toMonitorPage}>Create</button>
                <button onClick={backToUserPage}>Cancel</button>
            </form>
        </div>
    );
};

export default AddProject;