import React from "react";
import { createProject, updateProject } from "../api/projects"; // Adjust the path
import { useParams } from "react-router-dom";
import { useGetProjectById } from "../hooks/useGetProjectById";
import { useGetProjectStatus } from "../hooks/useGetProjectStatus";
import Card from "../components/Card";

const ProjectForm: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const { status } = useGetProjectStatus();

  const { loadingProject, project, updateProjectState } =
    useGetProjectById(projectId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (project) {
      if (project.id) {
        await updateProject(project.id, project);
      } else {
        await createProject(project);
      }
    }
  };

  const formatDateInputValue = (date: Date | undefined): string => {
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }
    return "";
  };

  if (loadingProject) return <div>Loading project...</div>;

  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      <Card title={"Editin Project"}>
        <form
          className="flex flex-col w-[600px] m-12 space-y-8"
          onSubmit={handleSubmit}
        >
          <div className="input-group">
            <label className="label">Name</label>
            <input
              className="input-field form-input"
              value={project?.name || ""}
              onChange={(e) => updateProjectState("name", e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="label">Description</label>
            <textarea
              className="input-field form-textarea"
              value={project?.description || ""}
              onChange={(e) =>
                updateProjectState("description", e.target.value)
              }
            />
          </div>
          <div className="input-group">
            <label className="label">Status</label>

            <select
              className="input-field form-multiselect"
              value={project?.projectStatusId || 0}
              onChange={(e) =>
                updateProjectState("projectStatusId", e.target.value)
              }
            >
              {status.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Start Date</label>
            <input
              className="input-field form-input"
              type="date"
              value={
                project
                  ? formatDateInputValue(project.startDate)
                  : formatDateInputValue(new Date())
              }
              onChange={(e) => updateProjectState("startDate", e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="label">End Date</label>
            <input
              className="input-field form-input"
              type="date"
              value={
                project
                  ? formatDateInputValue(project.endDate)
                  : formatDateInputValue(
                      new Date(new Date().setMonth(new Date().getMonth() + 6))
                    )
              }
              onChange={(e) => updateProjectState("endDate", e.target.value)}
            />
          </div>
          <button className="btn-primary" type="submit">
            {project?.id ? "Update" : "Create"}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ProjectForm;
