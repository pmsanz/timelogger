import React, { FC } from "react";
import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onModify: () => void;
  onCancel: () => void;
}

export const TaskItem: FC<TaskItemProps> = ({ task, onModify, onCancel }) => {
  const formatDateInputValue = (date: Date | undefined): string => {
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }
    return "";
  };

  return (
    <div className="task-item">
      <span>{task.name}</span>
      <span>{task.taskStatusId}</span>
      <span>{task ? formatDateInputValue(task.startDate) : ""}</span>
      <span>{task.preDefinedDuration}</span>
      <button onClick={onModify}>Modify</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};
