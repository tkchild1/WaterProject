import { useEffect, useState } from "react";
import type { Project } from "../types/Project";
import { deleteProject, fetchProjects } from "../api/ProjectsAPI";
import Pagination from "../components/Pagination";
import NewProjectForm from "../components/NewProjectForm";
import EditProjectForm from "../components/EditProjectForm";


const AdminProjectsPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

useEffect(() => {
    const loadProjects = async () => {
        try {
            setLoading(true);
            const data = await fetchProjects(pageSize, pageNum, []); // Fetch current page with selected page size and no filters
            setProjects(data.projects);
            setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };
    loadProjects();
    }, [pageSize, pageNum]); // Empty dependency array to run only once on mount

    const handleDelete = async (projectId: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;
        try {
            await deleteProject(projectId);
            setProjects(projects.filter((p) => p.projectId !== projectId));
        } catch (error) {
            alert("Failed to delete project: " + (error as Error).message);
        }
    };

    if (loading) {
        return <p>Loading projects...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Admin Projects Page</h1>

            {!showForm && <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>Add New Project</button>}

            {showForm && (
                <NewProjectForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchProjects(pageSize, pageNum, [])
                            .then((data) => setProjects(data.projects));
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingProject && (
                <EditProjectForm
                    project={editingProject}
                    onSuccess={() => {
                        setEditingProject(null);
                        fetchProjects(pageSize, pageNum, [])
                            .then((data) => setProjects(data.projects));
                    }}
                    onCancel={() => setEditingProject(null)}
                />
            )}

            <table className="table table-bordered table-striped">
                <thead className = "table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Regional Program</th>
                        <th>Impact</th>
                        <th>Phase</th>
                        <th>Project Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.projectId}>
                            <td>{project.projectId}</td>
                            <td>{project.projectName}</td>
                            <td>{project.projectType}</td>
                            <td>{project.projectRegionalProgram}</td>
                            <td>{project.projectImpact}</td>
                            <td>{project.projectPhase}</td>
                            <td>{project.projectFunctionalityStatus}</td>
                            <td><button className="btn btn-primary btn-sm w-100 mb-2" onClick={() => setEditingProject(project)}>Edit</button>
                            <button className="btn btn-danger btn-sm w-100 " onClick={() => handleDelete(project.projectId)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

             <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={(newPage) => setPageNumber(newPage)}
            onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setPageNumber(1);
            }}
            />
        </div>
    );

};
export default AdminProjectsPage;

