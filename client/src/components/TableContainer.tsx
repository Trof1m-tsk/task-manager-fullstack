import React, {FC, ReactNode} from 'react';
import {capitalize, SETTINGS} from "../utils/utils";
import {ITask} from "../models/ITask";

interface ITableContainer {
  position: 'header' | 'body'
  columns: string[] | ReactNode[]
  columnElement?: (tasks: ITask[]) => ReactNode
}

const TableContainer: FC<ITableContainer> = (props) => {
  const {position, columns, columnElement} = props;
  return (
    <div
      className={`bg-white rounded-2xl ${position === 'header' ? 'h-12 mb-2' : 'h-full flex-1'} 
      flex min-w-full w-fit py-2 shadow-xl border-2`}>
      {columns.map((column, index) => (
        <div
          className={`w-[${SETTINGS.COL_WIDTH}px] flex-1 flex items-center justify-center ${!!index ? 'border-l-2' : ''}`}
          key={position + index}
          id={position + index}
        >
          {typeof column === 'string' && !columnElement
            ? <p className={`${position === 'header' ? 'font-bold' : ''} font-mono`}>{capitalize(column)}</p>
            : column
          }
        </div>
      ))}
    </div>
  );
};

export default TableContainer;
