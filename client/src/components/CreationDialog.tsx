import React, {FC} from 'react';
import {useForm} from "react-hook-form";
import {addTask} from "../reduxToolkit/tasksSlice";
import {taskTypes} from "../types/types";
import {capitalize, getCurrentTime} from "../utils/utils";
import Button from "./Button";
import {ITask} from "../models/ITask";
import {useAppDispatch} from "../hooks/redux";
import {useHttp} from "../hooks/http.hook";

const { v4 } = require('uuid');

interface ICreationDialog {
  onClose: () => void
}

const CreationDialog: FC<ICreationDialog> = ({onClose}) => {
  const {
    register,
    formState: {errors, isDirty, dirtyFields, isValid, isValidating},
    getFieldState,
    reset,
    getValues,
    handleSubmit
  } = useForm();

  const {loading, request, error, clearError} = useHttp();
  const dispatch = useAppDispatch();

  const closeHandle = () => {
    reset()
    onClose();
  }

  const onSubmit = async () => {
    const {title, description, type} = getValues();
    const newTask: ITask = {
      id: v4(),
      task: {
        type,
        title,
        description,
        status: "new"
      },
      createdBy: 'Mikhail Trofimov',
      createdAt: getCurrentTime(),
      history: []
    };

    const data = await request('/api/tasks/create', 'POST', newTask);

    console.log('RESPONSE DATA: ', data);

    dispatch(addTask(newTask));
    // log()
    closeHandle();
  }

  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-[#00000050]'>
      <div
        className='absolute z-10 top-[50%] left-[50%] bg-white translate-y-[-50%] opacity-100
        translate-x-[-50%] min-w-[150px] min-h-[150px] bg-white shadow-2xl rounded-2xl p-4'>
        <form
          className='flex flex-col justify-between flex-grow w-[300px]'
          onError={e => console.log('error', e)}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-col'>
            <select
              className='w-full border-2 rounded outline-none px-2 h-[40px] mb-2 text-black'
              {...register('type')}
            >
              {taskTypes.map(type => (
                <option key={type} value={type}>{capitalize(type)}</option>
              ))}
            </select>
            <input
              className='w-full border-2 rounded outline-none px-2 h-[40px] mb-2'
              type='text'
              placeholder='enter title'
              {...register(
                'title',
                {
                  required: 'This field is required',
                  minLength: {
                    value: 3, message: 'Title should include at least 3 symbols'
                  }
                })}
            />
            <textarea
              className='w-full border-2 rounded outline-none px-2 h-[150px] resize-none'
              placeholder='enter description'
              {...register(
                'description',
                {
                  minLength: {value: 3, message: 'Title should include at least 3 symbols'},

                })}
            />
          </div>
          <div className='flex flex-row-reverse mt-4 h-[40px]'>
            <Button view='primary' text='Create' type='submit' disabled={!isValid}/>
            <div className='mr-2'></div>
            <Button view='secondary' text='Cancel' onClick={closeHandle}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreationDialog;
