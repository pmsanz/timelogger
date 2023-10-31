import React, { useState, useEffect, FC } from "react";
import { fetchTasksByProjectId } from ".././api/tasks";
import { fetchProjectById } from ".././api/projects";
import { fetchProjectStatusById } from ".././api/status";
import { Task } from ".././types/task";
import { Project } from ".././types/project";
import { Status } from ".././types/status";
import { useParams, useNavigate } from "react-router-dom";
import Table from "../components/Table";
import Card from "../components/Card";
import { TableColumnType } from "../types/table-column";
import { TableActionsType } from "../types/table-actions";

const TaskView: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tasksItems, setTasks] = useState<Task[]>([]);
  const projectIdCasted = Number(projectId);
  const [status, setStatus] = useState<Status | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  const handleButtonClick = (projectId: number | undefined) => {
    console.log("ProjectId", projectId);
    navigate(`/createTask/${projectId}`);
  };

  useEffect(() => {
    if (projectIdCasted) {
      setLoading(true);
      fetchProjectById(projectIdCasted).then((data) => {
        setProject(data);
        const projectLoaded: Project = data as Project;
        fetchProjectStatusById(projectLoaded.projectStatusId).then((s) => {
          setStatus(s);
        });

        setLoading(false);
      });
    }
  }, [projectIdCasted]);

  useEffect(() => {
    if (projectIdCasted) {
      setLoading(true);
      fetchTasksByProjectId(projectIdCasted).then((data) => {
        setTasks(data);
        setLoading(false);
      });
    }
  }, [projectIdCasted]);

  useEffect(() => {
    if (project != undefined) {
      setLoading(true);
      fetchProjectStatusById(projectIdCasted).then((data) => {
        setProject(data);
        setLoading(false);
      });
    }
  }, [projectIdCasted]);

  const columnsConfig: TableColumnType[] = [
    {
      title: "Task Name",
      prop: "name",
    },
    {
      title: "State",
      prop: "taskStatusId",
    },
    {
      title: `Start`,
      prop: "startDate",
    },
    {
      title: `Deadline`,
      prop: "endDate",
    },
  ];

  const actions: TableActionsType = {
    clickRowCallback: () => {},
    modifyCallback: () => {
      console.log("modify");
    },
    deleteCallback: () => {
      console.log("delete");
    },
  };

  if (loading) return <div>Loading...</div>;

  const CreateTask = () => (
    <>
      <div className="text-2xl font-medium my-10">
        No tasks on {project?.name}
      </div>
      <button
        className="btn-primary"
        onClick={() => handleButtonClick(project?.id)}
      >
        Create new task
      </button>
    </>
  );

  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      {tasksItems.length < 1 ? (
        <CreateTask />
      ) : (
        <section className="container mx-auto flex flex-col justify-center items-center">
          <Card title={`${project?.name} - Tasks - ${status?.name}`}>
            <Table
              columns={columnsConfig}
              actions={actions}
              rowKey={"id"}
              data={tasksItems}
            />
          </Card>
        </section>
      )}
    </div>
  );
};

export default TaskView;
