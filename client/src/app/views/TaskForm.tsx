import React, { useState, useEffect } from 'react';
import { createTask } from '.././api/tasks';
import { fetchProjectById } from '.././api/projects';
import { Task } from '.././types/task';
import { Project } from '.././types/project';
import './TaskForm.css';
import { useParams } from 'react-router-dom';

interface Props {
    projectId?: number;
}


const TaskForm: React.FC<Props> = () => {
    const [name, setName] = useState<string>('');
    const [project, setProject] = useState<Project>();
    const [description, setDescription] = useState<string>('');
    const [taskStatusId, setTaskStatusId] = useState<number>(1);
    const [preDefinedDuration, setPreDefinedDuration] = useState<number>(30);
    const [errorMessage, setErrorMessage] = useState<string>(''); // Initialize error message state

    const { projectId } = useParams<{ projectId: string }>();
    const projectIdCasted = Number(projectId);


    useEffect(() => {
        if (projectIdCasted) {
            fetchProjectById(projectIdCasted).then(data => {
                setProject(data);
            });
        }
    }, [projectIdCasted]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            
            // Check if the project status is Completed (= 2)
            if (project?.projectStatusId === 2) {
                setErrorMessage('You cannot create a new task in this project because it is in the "Completed" state.');
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
            setName('');
            setDescription('');
            setErrorMessage('');
        } catch (error) {
            console.error('Error creating the task:', error);
        }
    }

    return (
        <div className="task-form">
            <h2>{project?.name}</h2>
            <span>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            </span>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                </label>
                <label>
                    Status:
                    <select value={taskStatusId} onChange={e => setTaskStatusId(Number(e.target.value))}>
                        <option value={1}>Created</option>
                        <option value={2}>In process</option>
                        <option value={3}>Completed</option>
                        <option value={4}>Cancelled</option>
                    </select>
                </label>
                <label>
                    Duration:
                    <select value={preDefinedDuration} onChange={e => setPreDefinedDuration(Number(e.target.value))}>
                        <option value={30}>30 min</option>
                        <option value={60}>1 hr</option>
                        <option value={240}>4 hrs</option>
                        {/* Add any more durations as necessary */}
                    </select>
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default TaskForm;