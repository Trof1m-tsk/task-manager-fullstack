import {ITask} from "../models/ITask";

export const getDateTime = (ms: number) => {
  const date = new Date(ms).getDate();
  const month = new Date(ms).getMonth() + 1;
  const year = new Date(ms).getFullYear();
  const time = new Date(ms).toTimeString().split(' ')[0];

  return `${date}-${month}-${year} ${time}`;
}

export const capitalize = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export const getCreationTime = (taskObject: ITask) => {
  return getDateTime(taskObject.history[taskObject.history.length - 1].time);
}

export const getCurrentTime = (): number => {
  return new Date().getTime()
}

export const SETTINGS = {
  COL_WIDTH: 330,
}
