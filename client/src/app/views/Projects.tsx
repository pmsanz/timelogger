import React, { useEffect, useState, MouseEvent } from "react";
import Table from "../components/Table";
import { Project, ProjectStatus } from "../types/project";
import { useNavigate } from "react-router-dom";
import { deleteProject, fetchProjects } from "../api/projects";
import { Status } from "../types/status";
import { fetchProjectStatusById } from "../api/status";
import Card from "../components/Card";
import { TableColumnType } from "../types/table-column";
import { TableActionsType } from "../types/table-actions";

export default function Projects() {
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
              statusName: status.name,
              startDate: item.startDate,
              endDate: item.endDate,
            };
            return projectStatus;
          })
        );

        console.log({ projectStatusArray });
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

  const columnsConfig: TableColumnType[] = [
    {
      title: "Name",
      prop: "name",
    },
    {
      title: "State",
      prop: "statusName",
    },
    {
      title: `Start Date`,
      prop: "startDate",
    },
    {
      title: `Deadline`,
      prop: "endDate",
      sortCallback: orderProjects,
    },
  ];

  const actions: TableActionsType = {
    clickRowCallback: handleProjectNameClick,
    modifyCallback: handleButtonClick,
    deleteCallback: handleDelete,
  };

  return (
    <section className="container mx-auto flex flex-col justify-center items-center">
      <Card title={"Projects Overview"}>
        <Table
          columns={columnsConfig}
          actions={actions}
          rowKey={"id"}
          data={projects}
        />
      </Card>
    </section>
  );
}
