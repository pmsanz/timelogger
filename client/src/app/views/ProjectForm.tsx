import React, { useState, useEffect } from 'react';
import { Project } from '../types/project'; // Update the import path
import { Status } from '../types/status'; // Update the import path
import { createProject, updateProject, fetchProjectById } from '../api/projects'; // Adjust the path
import { useParams } from 'react-router-dom';
import { fetchProjectStatus } from '../api/status';

// Inside ProjectForm component:

interface ProjectProps {
    projectIdCasted?: number; // Use this to determine if we're editing or creating a new project
}

const ProjectForm: React.FC<ProjectProps> = () => {
    
    const [project, setProject] = useState<Project | null>(null);

    const [status, setStatus] = useState<Status[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const { projectId } = useParams<{ projectId: string }>();
    const projectIdCasted = Number(projectId);

    useEffect(() => {
        async function loadStatus() {
          const data = await fetchProjectStatus();
          setStatus(data);
        }
        loadStatus();
      }, []);

    useEffect(() => {
        if (projectIdCasted) {
            setLoading(true);
            fetchProjectById(projectIdCasted).then(data => {
                setProject(data);
                setLoading(false);
            });
        }
    }, [projectIdCasted]);

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
            return date.toISOString().split('T')[0];
        }
        return '';
    }

    if (loading) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input 
                    value={project?.name || ''} 
                    onChange={e => setProject(prev => ({ ...prev!, name: e.target.value }))} 
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea 
                    value={project?.description || ''} 
                    onChange={e => setProject(prev => ({ ...prev!, description: e.target.value }))} 
                />
            </div>
            <div>
                <label>Status:</label>
                
                
                <select 
                    value={project?.projectStatusId || 0} 
                    onChange={e => setProject(prev => ({ ...prev!, status: Number(e.target.value) }))}>
                       {status.map(status => (
                            <option key={status.id} value={status.id}>{status.name}</option>
                        ))}
                </select>
            </div>
            <div>
                <label>Start Date:</label>
                <input 
                    type="date" 
                    value={project ? formatDateInputValue(project.startDate) : formatDateInputValue(new Date())}
                    onChange={e => setProject(prev => ({ ...prev!, startDate: new Date(e.target.value) }))}
                />
            </div>
            <div>
                <label>End Date:</label>
                <input 
                    type="date" 
                    value={project ? formatDateInputValue(project.endDate) : formatDateInputValue(new Date(new Date().setMonth(new Date().getMonth() + 6)))}
                    onChange={e => setProject(prev => ({ ...prev!, endDate: new Date(e.target.value) }))}
                />
            </div>
            <button type="submit">{projectIdCasted ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default ProjectForm;