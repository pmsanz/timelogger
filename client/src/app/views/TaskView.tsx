import React, { useState, useEffect } from 'react';
import { fetchTasksByProjectId } from '.././api/tasks';
import { fetchProjectById } from '.././api/projects';
import { fetchProjectStatusById } from '.././api/status';
import { TaskList } from '.././components/TaskList';
import { Task } from '.././types/task';
import { Project } from '.././types/project';
import { Status } from '.././types/status';
import { useParams, useNavigate } from 'react-router-dom';
import './TaskView.css';

const TaskView: React.FC = () => {

  const { projectId } = useParams<{ projectId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tasksItems, setTasks] = useState<Task[]>([]);
  const projectIdCasted = Number(projectId);
  const [status, setStatus] = useState<Status | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const navigate = useNavigate();
  
  const handleButtonClick = (projectId: number|undefined) => {
    console.log("ProjectId",projectId)
    navigate(`/createTask/${projectId}`);
  };

  useEffect(() => {
    if (projectIdCasted) {
        setLoading(true);
        fetchProjectById(projectIdCasted).then(data => {
            setProject(data);
            const projectLoaded : Project = data as Project;
            fetchProjectStatusById(projectLoaded.projectStatusId).then( s => {
            setStatus(s);
          });
            
            setLoading(false);

        });
    }
}, [projectIdCasted]);

  useEffect(() => {
    if (projectIdCasted) {
        setLoading(true);
        fetchTasksByProjectId(projectIdCasted).then(data => {
            setTasks(data);
            setLoading(false);
        });
    }
}, [projectIdCasted]);

useEffect(() => {
  if (project != undefined) {
      setLoading(true);
      fetchProjectStatusById(projectIdCasted).then(data => {
          setProject(data);
          setLoading(false);
      });
  }
}, [projectIdCasted]);



if (loading) return <div>Loading...</div>
else {

  if(tasksItems.length < 1){
    return (
    <>
    <div>No tasks on {project?.name}</div>
    <button onClick={() => handleButtonClick(project?.id)}>Create new task</button>
    </>
    );
  }
  else{
    return (
      <div className="task-view">
        <h1>{project?.name} - Tasks - {status?.name}</h1>
        <div className="task-header">
        <div>Task Name</div><div>State</div><div>Start date</div><div>Duration</div><div>Modify</div><div>Delete</div>
        </div>
        <TaskList tasks={tasksItems} />
        <button className="add" onClick={() => handleButtonClick(project?.id)}>Create new task</button>
      </div>
    );
  }}
};

export default TaskView;