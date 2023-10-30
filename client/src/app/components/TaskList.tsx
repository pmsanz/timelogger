import React, { FC, useState } from "react";
import { Task } from ".././types/task";
import { TaskItem } from "./TaskItem";
import { deleteTask } from ".././api/tasks";

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: FC<TaskListProps> = ({ tasks }) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  const deleteHandler = async (id: number | undefined) => {
    try {
      await deleteTask(id);
      const updatedTaskList = taskList.filter((task) => task.id !== id);
      setTaskList(updatedTaskList);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (taskList == null) return <div>Loading...</div>;

  return (
    <div className="task-list">
      {taskList.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onModify={() => {
            // Handle modify
          }}
          onCancel={() => deleteHandler(task.id)}
          // Pass the deleteHandler to TaskItem
        />
      ))}
    </div>
  );
};
