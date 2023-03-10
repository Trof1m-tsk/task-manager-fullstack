import {ITaskStatus, ITaskType} from "../types/types";

export interface ITaskValue {
  type: ITaskType;
  title: string;
  description: string;
  status: ITaskStatus;
}

export interface IHistory {
  comment: string;
  time: number;
  author: string
  previousValue: ITaskValue;
}

export interface  ITask {
  id: string;
  task: ITaskValue;
  history: IHistory[];
  createdBy: string;
  createdAt: number;
}
