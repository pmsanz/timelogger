const BASE_URL = "http://localhost:3001/api/tasks"; // Update the base URL accordingly

export async function fetchTasksByProjectId(projectId: number) {
  try {
    const response = await fetch(`${BASE_URL}/fetchTasksByProjectId/${projectId}`);
    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export async function fetchTasksById(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const task = await response.json();
    return task;
  } catch (error) {
    console.error(`Error fetching task with id ${id}:`, error);
    throw error;
  }
}

export async function createTask(task: any) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Failed to create task: ${response.statusText}`);
    }

    const createdTask = await response.json();
    return createdTask;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

export async function updateTask(id: number, task: any) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.statusText}`);
    }

    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error(`Error updating task with id ${id}:`, error);
    throw error;
  }
}

export async function deleteTask(id: number|undefined) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.statusText}`);
    }

    const deletedTask = await response.json();
    return deletedTask;
  } catch (error) {
    console.error(`Error deleting task with id ${id}:`, error);
    throw error;
  }
}