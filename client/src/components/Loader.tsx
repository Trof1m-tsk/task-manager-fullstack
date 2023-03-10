import React, {FC, useEffect} from 'react';
import {ThreeDots} from "react-loader-spinner";

const Loader: FC = () => {
  return (
    <div className='absolute w-screen h-screen bg-black bg-opacity-30 flex justify-center items-center'>
      <ThreeDots radius='10' color='white' width='120' />
    </div>
  );
};

export default Loader;
