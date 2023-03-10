import React, {FC, useEffect} from 'react';
import Button from "./Button";
import {useHttp} from "../hooks/http.hook";

const Error: FC = () => {
  const {error, clearError} = useHttp();

  return (
    <div className='absolute w-screen h-screen bg-black bg-opacity-30 flex
     justify-center items-center'>
      <div className='flex flex-col gap-4 justify-center items-center max-w-[700px] max-h-[400px]
      border-2 border-red-500 bg-red-100 rounded-2xl p-4'>
        <p className='text-3xl text-red-500 whitespace-pre-wrap'>
          {error ? error.toString() : ''}
        </p>
        <Button view='secondary' text='Close' onClick={clearError} />
      </div>
    </div>
  );
};

export default Error;
