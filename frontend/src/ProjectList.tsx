import { useEffect, useState } from "react";
import type { Project } from "./types/Project";

function ProjectList() {

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://localhost:5155/api/Water/AllProjects");
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <>
            <h1>Water Projects</h1>
            <br />
            {projects.map((p) => 
                <div id="projectCard">
                    <h2>{p.projectName}</h2>
                    <ul>
                        <li>Type: {p.projectType}</li>
                        <li>Regional Program: {p.projectRegionalProgram}</li>
                        <li>Impact: {p.projectImpact}</li>
                        <li>Phase: {p.projectPhase}</li>
                        <li>Project Status: {p.projectFunctionalityStatus}</li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default ProjectList;