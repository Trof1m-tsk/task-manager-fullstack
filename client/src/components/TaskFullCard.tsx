import React, {FC, ReactElement, useEffect, useMemo, useState} from 'react';
import {IHistory, ITask, ITaskValue} from "../models/ITask";
import Button from "./Button";
import {capitalize, getCurrentTime, getDateTime} from "../utils/utils";
import {useForm} from "react-hook-form";
import {useHttp} from "../hooks/http.hook";
import {taskTypes} from "../types/types";

interface ITaskFullCard {
  taskObject: ITask
}

interface ITitledField {
  title: string;
  children: ReactElement;
  accordion?: boolean;
}

interface IHistoryItem {
  historyItem: IHistory;
  changedValues: ITaskValue;
  lineAbove: boolean;
}

const TitledField: FC<ITitledField> = props => {
  const {title, children, accordion} = props;

  return (
    accordion
      ? <details className='flex flex-col mt-2'>
          <summary className='text-sm mb-1 font-mono font-bold'>{`${title}:`}</summary>
          {children}
        </details>
      : <div className='flex flex-col mt-2'>
          <span className='text-sm mb-1 font-mono font-bold'>{`${title}:`}</span>
          {children}
        </div>
  );
};

const HistoryItem: FC<IHistoryItem> = ({historyItem, changedValues}) => {
  const {author, time, comment, previousValue} = historyItem;

  return (
    <div className='mb-2 border-t-2'>
      {comment && <TitledField title='Comment'>
        <p className='font-sans break-words whitespace-pre-line'>
          {comment}
        </p>
      </TitledField>}
      <TitledField title='Changes' accordion>
        <div className='border-2 p-2 pb-1 pr-1 rounded-md bg-gray-100 ml-3'>
          {Object.keys(changedValues).map(key => (
            (previousValue[key as keyof ITaskValue]) !== (changedValues[key as keyof ITaskValue]) &&
            <div key={key} className='flex w-full justify-center mb-1 flex-wrap flex-col'>
              <div className='flex-1 mr-1 w-fit '>
                <span>{capitalize(key)}:</span>
                <div className='text-red-600 bg-red-200 line-through w-fit px-2 rounded-full'>
                  {previousValue[key as keyof ITaskValue]}
                </div>
              </div>
              <div className='flex-1 mt-1'>
                <div
                  className='text-green-700 bg-green-200 w-fit px-2 rounded-full'>
                  {changedValues[key as keyof ITaskValue]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </TitledField>
      <TitledField title='Updated'>
        <div className='overflow-ellipsis flex-wrap flex justify-between items-end w-full'>
          <div className='flex items-center'>
            <span className='text-sm mr-2 '>by:</span>
            <p className='truncate text-sm font-bold'>{author}</p>
          </div>
          <div className='flex items-center'>
            <span className='text-sm mr-2 '>at:</span>
            <p className='font-bold text-sm'>{getDateTime(time)}</p>
          </div>
        </div>
      </TitledField>
    </div>
  );
};

const TaskFullCard: FC<ITaskFullCard> = ({taskObject}) => {
  const {register, getValues, setValue, formState: {isDirty}} = useForm();
  const [taskObj, setTaskObj] = useState<ITask>(taskObject);
  const {id, task, history, createdBy, createdAt} = taskObj;
  const {request, error, clearError, loading} = useHttp();
  // const navigate = useNavigate();

  // const cancelHandler = () => {
  //   navigate(-1);
  // };

  useEffect(() => {
    console.log('TASK OBJ', taskObj);
  }, [taskObj]);


  const getCardName = () => {
    return `${capitalize(task.type)}-${id || '...'}`
  };

   const handleSetTask = (key: string, value: string) => {
     setTaskObj({...taskObj, task: {...task, [key]: value}})
   }

  const saveHandler = async () => {
    const {comment, title, description} = getValues();

    const updatedTask: ITask = {
      ...taskObject,
      task: {
        ...taskObj.task,
        title: title + 'updated',
        description
      },
      history: [
        {
          comment: comment,
          time: getCurrentTime(),
          previousValue: taskObj.task,
          author: 'User who updated'
        },
        ...taskObj.history
      ],
    }

    const resTask = await request('/api/tasks/update', 'POST', updatedTask);
    setTaskObj(resTask);
  }

  return (
    <div className='w-[50%] min-w-[700px] h-fit'>
      <div className='bg-white rounded-2xl p-4 border-2 shadow-2xl mb-2'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-2xl font-mono'>{getCardName()}</h2>
        </div>
        <TitledField title='Task type'>
          <select
            value={task.type}
            className='w-[150px] h-[40px] border-2 rounded outline-none px-2'
            onChange={(e) => {
              handleSetTask('type', e.target.value);
            }}
          >
            {taskTypes.map(type => (
              <option key={type} value={type}>{capitalize(type)}</option>
            ))}
          </select>
        </TitledField>
        <TitledField title='Title'>
          <input
            className='w-full border-2 rounded outline-none px-2 h-[40px]'
            type='text'
            value={task.title}
            onChange={(e) => {
              handleSetTask('title', e.target.value);
              // setValue('title', e.target.value);
            }}
          />
        </TitledField>
        <TitledField title='Description'>
        <textarea
          className='w-full border-2 rounded outline-none px-2 h-[350px] resize-none'
          value={task.description}
          onChange={(e) => {
            handleSetTask('description', e.target.value);
            // setValue('description', e.target.value);
          }}
        />
        </TitledField>
        <TitledField title='Created'>
          <div className='overflow-ellipsis flex-wrap flex justify-between items-end w-full'>
            <div className='flex items-center'>
              <span className='text-sm mr-2 '>by:</span>
              <p className='truncate text-sm font-bold'>{createdBy}</p>
            </div>
            <div className='flex items-center min-w-[150px]'>
              <span className='text-sm mr-2 '>at:</span>
              <p className='font-bold text-sm'>{createdAt ? getDateTime(createdAt) : ''}</p>
            </div>
          </div>
        </TitledField>
      </div>
      {history.length > 0 && <div className='bg-white rounded-2xl p-4 border-2 shadow-2xl mb-2'>
        <TitledField title='History' accordion>
          <div>
            {history.map((historyItem, index) => (
              <HistoryItem
                key={historyItem.time}
                historyItem={historyItem}
                changedValues={(index === 0) ? task : history[index - 1].previousValue}
                lineAbove={!!index}
              />
            ))}
          </div>
        </TitledField>
      </div>}
      <div className='bg-white rounded-2xl p-4 border-2 shadow-2xl'>
        <TitledField title='Comment'>
        <textarea
          className='w-full border-2 rounded outline-none px-2 h-[150px] resize-none'
          placeholder='Leave your comment here'
          {...register('comment')}
          onChange={(e) => {
            setValue('comment', e.target.value);
          }}
        />
        </TitledField>
      </div>
      <div className='flex flex-row-reverse mt-4 h-[40px]'>
        <Button view='primary' text='Save' type='submit' onClick={saveHandler} disabled={!isDirty}/>
        {/*<div className='mr-2'></div>*/}
        {/*<Button view='secondary' text='Cancel' onClick={cancelHandler}/>*/}
      </div>
    </div>
  );
};

export default TaskFullCard;
