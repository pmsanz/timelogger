import React, { MouseEvent, useEffect, useState } from "react";
import { Project, ProjectStatus } from "../types/project"; // Update the import path
import { Status } from "../types/status"; // Update the import path
import { fetchProjects, deleteProject } from "../api/projects";
import { fetchProjectStatusById } from "../api/status";
import { useNavigate } from "react-router-dom";
import { GrDescend, GrAscend } from "react-icons/gr";

const Table: React.FC = () => {
  const [projects, setProjects] = useState<ProjectStatus[]>([]);
  const navigate = useNavigate();

  // Method to order projects by endDate
  const orderProjects = (asc: boolean) => {
    const sortedProjects = [...projects];
    sortedProjects.sort((a, b) => {
      const dateA = new Date(a.endDate).getTime();
      const dateB = new Date(b.endDate).getTime();

      if (asc) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setProjects(sortedProjects);
  };

  useEffect(() => {
    async function loadData() {
      const data = await fetchProjects();
      const projectData: Project[] = data as Project[];
      // console.log("projectData", projectData);

      if (projectData.length > 0) {
        const projectStatusArray: ProjectStatus[] = await Promise.all(
          projectData.map(async (item) => {
            const status: Status = await fetchProjectStatusById(
              item.projectStatusId
            );
            const projectStatus: ProjectStatus = {
              id: item.id,
              name: item.name,
              description: item.description,
              status: status,
              startDate: item.startDate,
              endDate: item.endDate,
            };
            return projectStatus;
          })
        );
        setProjects(projectStatusArray);
      }
    }
    loadData();
  }, []);

  const handleDelete = async (
    event: MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    try {
      event.stopPropagation();
      await deleteProject(id);
      // Refresh the projects after deletion
      const updatedProjects = await fetchProjects();

      setProjects(updatedProjects);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleButtonClick = (
    event: MouseEvent<HTMLButtonElement>,
    projectId: number
  ) => {
    event.stopPropagation();
    navigate(`/edit/${projectId}`);
  };

  const handleProjectNameClick = (projectId: number) => {
    navigate(`/taskView/${projectId}`);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="table-th">Name</th>
            <th className="table-th">State</th>
            <th className="table-th">Start Date</th>
            <th className="table-th">
              Deadline
              <button className="ml-2" onClick={() => orderProjects(true)}>
                <GrAscend />
              </button>
              <button className="ml-2" onClick={() => orderProjects(false)}>
                <GrDescend />
              </button>
            </th>
            <th className="table-th">Modify</th>
            <th className="table-th">Delete</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="bg-white border-b  hover:bg-gray-100"
              onClick={() => handleProjectNameClick(project.id)}
            >
              <td className="table-td text-gray-700">{project.name}</td>
              <td className="table-td">{project.status.name}</td>
              <td className="table-td">{project.startDate}</td>
              <td className="table-td">{project.endDate}</td>
              <td className="table-td">
                <button
                  className="btn-primary"
                  onClick={(e) => handleButtonClick(e, project.id)}
                >
                  Modify
                </button>
              </td>
              <td className="table-td">
                <button
                  className="btn-primary"
                  onClick={(e) => handleDelete(e, project.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
