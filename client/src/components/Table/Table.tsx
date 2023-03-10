import React, {FC, useEffect, useMemo, useState} from 'react';
import {ITask} from "../../models/ITask";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useHttp} from "../../hooks/http.hook";
import Loader from "../Loader";
import Error from "../Error";
import CreationDialog from "../CreationDialog";
import {loadTasks} from "../../reduxToolkit/tasksSlice";
import TaskTableCard from "../TaskTableCard/TaskTableCard";

interface ITable {
  columns: string[]
}

const Table: FC<ITable> = ({columns}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const {request, error, loading, clearError} = useHttp();
  const dispatch = useAppDispatch();
  const tasks: ITask[] = useAppSelector(state => state.tasks.tasks);

  const tasksSortedByStatus = useMemo(() => {
    if (tasks?.length === 0) return [];

    let sorted: ITask[][] = [];

    columns.forEach(column => {
      const filteredByStatusArray = tasks?.filter(taskObj => taskObj.task.status === column);
      sorted.push(filteredByStatusArray)
    })

    return sorted;
  }, [columns, tasks]);

  const getData = async function () {
    const fetched = await request('/api/tasks/getAll');

    // setTasks(fetched);
    dispatch(loadTasks(fetched));
  }

  useEffect(() => {
    getData()
      .then(() => console.log('Data was loaded from server.'))

    console.log('TASKS', tasks);
  }, []);

  if (loading) {
    return <Loader/>
  }

  if (error) {
    return <Error/>
  }

  if (tasks?.length === 0) {
    return (
      <div className='p-4 w-full h-full flex justify-center mt-4'>
        <p className='font-mono'>You do not have tasks yet.</p>
      </div>
    )
  }

  return (
    <div className='p-2 overflow-x-auto h-full'>
      <table>
        <thead>
        <tr>
          {columns.map(col => (
            <th>{col}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        <tr>
          {tasksSortedByStatus.map((tasks: ITask[]) => (
            <td>
              {

                tasks?.map(task => (
                  <TaskTableCard taskObject={task}/>
                ))
              }
            </td>
          ))}
        </tr>
        </tbody>
      </table>

      {openDialog &&
        <CreationDialog onClose={() => setOpenDialog(false)}/>
      }
    </div>
  );
};

export default Table;
