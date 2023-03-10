import React, {FC, useState} from 'react';
import {ITask} from "../../models/ITask";
import {getDateTime} from "../../utils/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import './styles.scss'

const TaskTableCard: FC<{ taskObject: ITask }> = ({taskObject}) => {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  const {task, createdBy, createdAt} = taskObject;

  console.log('TASK', taskObject);

  const openCardHandler = () => setOpened(prev => !prev);

  const editClickHandler = (e: any) => {
    e.stopPropagation();
    navigate(`/tasks/${taskObject.id}`)
    // dispatch(editTask({...taskObject, task: {...taskObject.task, status: 'in progress'}}));
  }

  const getTypeColor = () => {
    switch (taskObject.task.type) {
      case 'problem':
        return '#ff7f00';
      case 'bug':
        return '#f00';
      case 'improvement':
        return '#40bba4';
      case 'support':
        return '#abab0a';
      case 'feature':
        return '#11b611';
      default:
        return '#2167de';
    }
  }

  return (
    <div
      className='task-card'
      style={{width: '290px'}}
      onClick={openCardHandler}
    >
      <div className='task-card-content'>
        <div className='task-card-header'>
          <div
            style={{backgroundColor: getTypeColor()}}
            className={`px-2 flex-grow-0 rounded-full text-white
            mr-2 w-fit h-[25px] overflow-hidden`}
          >
            <p>{task.type}</p>
          </div>

          <div className='flex gap-2 bg-purple-800'>
            <button onClick={editClickHandler} className='text-gray-400 hover:text-blue-700'>
              <FontAwesomeIcon icon={faEdit}/>
            </button>
            <button onClick={editClickHandler} className='text-gray-400 hover:text-blue-700'>
              <FontAwesomeIcon icon={faTrash}/>
            </button>
          </div>
        </div>
        <div className='w-[100%] break-words'>
          {task.title}
        </div>
      </div>

      {opened &&
        <div className='w-full'>
          <div className='my-4 border-t-2'>
            <p className='font-bold text-sm my-2'>Description</p>
            <div className='max-h-32 overflow-y-auto'>
              {task.description &&
                <p className='font-sans break-words whitespace-pre-line'>
                  {task.description}
                </p>
              }
            </div>
          </div>
          <div className='border-t-2 pt-2'>
            <div className='flex-wrap flex justify-between items-end w-full'>
              <p className='truncate text-sm'>{createdBy}</p>
              <p className='font-bold text-sm'>{getDateTime(createdAt)}</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default TaskTableCard;
