import React, { useEffect, useState } from 'react';
import { Project, ProjectStatus } from '../types/project'; // Update the import path
import { Status } from '../types/status'; // Update the import path
import {  fetchProjects, deleteProject  } from '../api/projects';
import {  fetchProjectStatusById  } from '../api/status';
import { useNavigate  } from 'react-router-dom';
import './Table.css';


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
        console.log("projectData",projectData);

        if(projectData.length > 0){

        const projectStatusArray: ProjectStatus[] = await Promise.all(
          projectData.map(async (item) => {
            const status : Status = await fetchProjectStatusById(item.projectStatusId);
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
  
    const handleDelete = async (id: number) => {
      try {
        await deleteProject(id);
        // Refresh the projects after deletion
        const updatedProjects = await fetchProjects();
        
        setProjects(updatedProjects);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
   

    const handleButtonClick = (projectId: number) => {
        navigate(`/edit/${projectId}`);
      };

      const handleProjectNameClick = (projectId: number) => {
        navigate(`/taskView/${projectId}`);
      };
  
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Start Date</th>
            <th>Deadline <button onClick={() => orderProjects(true)}>Asc</button><button onClick={() => orderProjects(false)}>Desc</button></th>
            <th>Modify</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td onClick={() => handleProjectNameClick(project.id)}>{project.name}</td>
              <td>{project.status.name}</td>
              <td>{project.startDate}</td>
              <td>{project.endDate}</td>
              <td className='buttonClass'>
              <button onClick={() => handleButtonClick(project.id)}>Modify</button>
              </td>
              <td className='buttonClass'>
                <button onClick={() => handleDelete(project.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default  Table;