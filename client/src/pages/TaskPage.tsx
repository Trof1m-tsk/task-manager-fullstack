import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ITask} from "../models/ITask";
import {useAppSelector} from "../hooks/redux";
import Header from "../components/Header/Header";
import TaskFullCard from "../components/TaskFullCard";
import {useHttp} from "../hooks/http.hook";
import Loader from "../components/Loader";
import Error from "../components/Error";
import {ITaskStatus, ITaskType} from "../types/types";

interface ITaskPage {
  newTask?: boolean
}

const emptyTask: ITask =  {
  id: '',
  history: [],
  createdBy: '',
  createdAt: 0,
  task: {
    title: '',
    type: 'feature' as ITaskType,
    description: '',
    status: 'new' as ITaskStatus,
  }
}

const TaskPage: FC<ITaskPage> = ({newTask}) => {
  const params = useParams();
  const {request, loading, error, clearError} = useHttp();
  const [task, setTask] = useState<ITask>(emptyTask);

  const getTask = async () => {
    const fetchedTask = await request('/api/tasks/' + params.taskId);


    setTask(fetchedTask as ITask);
    console.log('FETCHED TASK', fetchedTask);
    console.log('FETCHED TASK -> SET', task);

    setTimeout(() => {
      console.log('FETCHED TASK -> SET after 2 sec',task);
    },  2000)

  }

  useEffect(() => {
    if (!newTask) {
      getTask();
    }
  }, []);

  console.log('params', params);

  // if (loading) {
  //   alert('jksdh')
  //   return <Loader />
  // }

  if (error) {
    return <Error />
  }

  return (
    <div className='flex flex-col h-screen w-screen'>
      <Header/>
      <div className='flex h-full'>

        <div className='p-4 w-full h-fit min-h-full flex justify-center'>
          {task && <TaskFullCard taskObject={task}/>}
        </div>

        <div className='bg-blue-300'>
          <pre>{JSON.stringify(task, null, 2) ?? 'No current task'}</pre>
        </div>
      </div>


    </div>
  );
};

export default TaskPage;
