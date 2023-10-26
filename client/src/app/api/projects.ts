const BASE_URL = "http://localhost:3001/api/projects";

export async function fetchProjects() {
  try {
    const response = await fetch(BASE_URL);
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function fetchProjectById(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const project = await response.json();
    return project;
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw error;
  }
}

export async function createProject(project: any) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error(`Failed to create project: ${response.statusText}`);
    }

    const createdProject = await response.json();
    return createdProject;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function updateProject(id: number, project: any) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error(`Failed to update project: ${response.statusText}`);
    }

    const updatedProject = await response.json();
    return updatedProject;
  } catch (error) {
    console.error(`Error updating project with id ${id}:`, error);
    throw error;
  }
}

export async function deleteProject(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete project: ${response.statusText}`);
    }

    const deletedProject = await response.json();
    return deletedProject;
  } catch (error) {
    console.error(`Error deleting project with id ${id}:`, error);
    throw error;
  }
}