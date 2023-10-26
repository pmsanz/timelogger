export interface Task {
    id?: number;
    name: string;
    description?: string;
    taskStatusId: number;
    log?: string;
    startDate: Date;
    endDate?: Date;
    preDefinedDuration: number;
    projectId: number;
  }
