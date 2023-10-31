import React, { useState, useEffect } from "react";
import { createTask } from ".././api/tasks";
import { fetchProjectById } from ".././api/projects";
import { Task } from ".././types/task";
import { Project } from ".././types/project";
// import './TaskForm.css';
import { useParams } from "react-router-dom";

interface Props {
  projectId?: number;
}

const TaskForm: React.FC<Props> = () => {
  const [name, setName] = useState<string>("");
  const [project, setProject] = useState<Project>();
  const [description, setDescription] = useState<string>("");
  const [taskStatusId, setTaskStatusId] = useState<number>(1);
  const [preDefinedDuration, setPreDefinedDuration] = useState<number>(30);
  const [errorMessage, setErrorMessage] = useState<string>(""); // Initialize error message state

  const { projectId } = useParams<{ projectId: string }>();
  const projectIdCasted = Number(projectId);

  useEffect(() => {
    if (projectIdCasted) {
      fetchProjectById(projectIdCasted).then((data) => {
        setProject(data);
      });
    }
  }, [projectIdCasted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Check if the project status is Completed (= 2)
      if (project?.projectStatusId === 2) {
        setErrorMessage(
          'You cannot create a new task in this project because it is in the "Completed" state.'
        );
        return; // Exit the function without creating a task
      }

      // If the project status is not Completed, create a new task
      const task: Task = {
        name: name,
        description: description,
        taskStatusId: taskStatusId,
        startDate: new Date(),
        preDefinedDuration: preDefinedDuration,
        projectId: projectIdCasted,
      };

      await createTask(task);
      setName("");
      setDescription("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating the task:", error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      <h2 className="text-2xl font-medium my-10">{project?.name}</h2>
      <div className="paper p-10">
        <span>
          {errorMessage && <p className="text-red-700">{errorMessage}</p>}
        </span>
        <form
          className="flex flex-col w-[600px] space-y-8"
          onSubmit={handleSubmit}
        >
          <div className="input-group">
            <label className="label">Name</label>
            <input
              className="input-field form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="label">Description</label>
            <textarea
              className="input-field form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="label">Status</label>
            <select
              className="input-field form-multiselect"
              value={taskStatusId}
              onChange={(e) => setTaskStatusId(Number(e.target.value))}
            >
              <option value={1}>Created</option>
              <option value={2}>In process</option>
              <option value={3}>Completed</option>
              <option value={4}>Cancelled</option>
            </select>
          </div>

          <div className="input-group">
            <label className="label">Duration </label>
            <select
              className="input-field form-multiselect"
              value={preDefinedDuration}
              onChange={(e) => setPreDefinedDuration(Number(e.target.value))}
            >
              <option value={30}>30 min</option>
              <option value={60}>1 hr</option>
              <option value={240}>4 hrs</option>
              {/* Add any more durations as necessary */}
            </select>
          </div>

          <button className="btn-primary" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
