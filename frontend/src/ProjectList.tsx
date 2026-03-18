import { useEffect, useState } from "react";
import type { Project } from "./types/Project";

function ProjectList() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`http://localhost:5155/api/Water/AllProjects?pageSize=${pageSize}&pageNum=${pageNumber}`);
                const data = await response.json();
                setProjects(data.projects);
                setTotalItems(data.totalNumProjects);
                setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, [pageSize, pageNumber]);

    return (
        <>
            <h1>Water Projects</h1>
            <br />
            {projects.map((p) => 
                <div id="projectCard" className="card mb-3" key={p.projectId}>
                    <div className="card-body">
                        <h2 className="card-title">{p.projectName}</h2>
                        <ul className="list-unstyled">
                            <li><strong>Type:</strong> {p.projectType}</li>
                            <li><strong>Regional Program:</strong> {p.projectRegionalProgram}</li>
                            <li><strong>Impact:</strong> {p.projectImpact}</li>
                            <li><strong>Phase:</strong> {p.projectPhase}</li>
                            <li><strong>Project Status:</strong> {p.projectFunctionalityStatus}</li>
                        </ul>
                    </div>
                </div>
            )}

            <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>Previous</button>

            {
                [...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setPageNumber(index + 1)} disabled={pageNumber === index + 1}>
                        {index + 1}
                    </button>
                ))
            }

            <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === totalPages}>Next</button>    

            <br />
            <label>
                Results per page:
                <select value={pageSize} onChange={(p) => setPageSize(Number(p.target.value))}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
            <br />
        </>
    );
}

export default ProjectList;