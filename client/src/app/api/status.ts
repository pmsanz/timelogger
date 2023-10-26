const BASE_URL = "http://localhost:3001/api/";
const PROJECT_URL = BASE_URL + "projectStatus/";
const TASK_URL = BASE_URL + "taskStatus/";

/* PROJECT STATUS */
export async function fetchProjectStatus() {
  try {
    const response = await fetch(PROJECT_URL);
    const projectStatusObjects = await response.json();
    return projectStatusObjects;
  } catch (error) {
    console.error('Error fetching project status:', error);
    throw error;
  }
}

export async function fetchProjectStatusById(id: number) {
  try {
    const response = await fetch(`${PROJECT_URL}${id}`);
    const projectStatusObject = await response.json();
    return projectStatusObject;
  } catch (error) {
    console.error(`Error fetching project status with id ${id}:`, error);
    throw error;
	 
  }
}


/* TASK STATUS */

export async function fetchTaskStatus() {
  try {
    const response = await fetch(TASK_URL);
    const taskStatusObjects = await response.json();
    return taskStatusObjects;
  } catch (error) {
    console.error('Error fetching task status:', error);
    throw error;
	 
  }
}

export async function fetchTaskStatusById(id: number) {
  try {
    const response = await fetch(`${TASK_URL}/${id}`);
    const taskStatusObject = await response.json();
    return taskStatusObject;
  } catch (error) {
    console.error(`Error fetching task status with id ${id}:`, error);
    throw error;
	 
  }
}