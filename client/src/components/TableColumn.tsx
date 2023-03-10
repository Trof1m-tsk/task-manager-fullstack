import TaskTableCard from './TaskTableCard/TaskTableCard';
import {FC} from "react";
import {ITask} from "../models/ITask";

interface ITableColumn {
  tasks: ITask[]
}

const TableColumn: FC<ITableColumn> = ({tasks}) => {
  return (
    <div className='px-2 w-full h-full'>
      {tasks.map((task, index) => (
        <TaskTableCard key={task.id + index} taskObject={task}/>
      ))}
    </div>
  );
}

export default TableColumn;
