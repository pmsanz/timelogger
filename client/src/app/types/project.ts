import "./status";
import { Status } from "./status";
export interface Project {
  id: number;
  name: string;
  description: string;
  projectStatusId: number;
  startDate: Date;
  endDate: Date;
}

export interface ProjectStatus {
  id: number;
  name: string;
  description: string;
  status: Status;
  statusName: string;
  startDate: Date;
  endDate: Date;
}
