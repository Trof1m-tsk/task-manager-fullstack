import React from 'react';
import Header from "../components/Header/Header";
import Table from "../components/Table/Table";
import {statuses} from "../types/types";

const TaskBoardPage = () => {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <Header/>
      <Table columns={(statuses as unknown as string[])}/>
    </div>
  );
}

export default TaskBoardPage;
