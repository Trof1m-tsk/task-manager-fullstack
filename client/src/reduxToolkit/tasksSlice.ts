import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITask} from "../models/ITask";
import {ITaskStatus, ITaskType} from "../types/types";
import {getCurrentTime} from "../utils/utils";

let counter = 0;

interface IState {
  tasks: ITask[]
}

const initialState = {
  tasks: []
}

//////
//TODO delete mock data
// const mockHistory = [
//   {
//     author: 'John Travolta',
//     comment: 'flakjfalkjflkj\nskjhfkjahfkasfdafdlksjhdgkljsd\n sdhkkjsh\nkjh  kjshdf h\nksjh',
//     previousValue: {
//       type: "bug" as ITaskType,
//       title: 'last version on title',
//       description: 'last version of description',
//       status: "new" as ITaskStatus
//     },
//     time: getCurrentTime() - 2500000
//   },
//   {
//     author: 'Johnny Depp',
//     comment: 'sjhdgkljsd\n sdhkkjsh\nkjh  kjshdf h\nksjh',
//     previousValue: {
//       type: "bug" as ITaskType,
//       title: 'updated version on title',
//       description: 'updated version of description',
//       status: "in progress" as ITaskStatus
//     },
//     time: getCurrentTime() - 1000000
//   }
// ]

const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: {
    loadTasks(state: IState, action: PayloadAction<ITask[]>) {
      console.log('Tasks: ', action.payload);
      state.tasks = action.payload;
    },
    addTask(state: IState, action: PayloadAction<ITask>) {
      console.log('LOG TYPE', action.payload);
      counter++;
      state.tasks.push(
        {
          ...action.payload,
          task: {
            ...action.payload.task,
            status: action.payload.task.status,
            type: action.payload.task.type
          }
        }
      )
    },
    editTask(state: IState, action: PayloadAction<ITask>) {
      console.log('EDIT TASK ACTION 1', Array.from(state.tasks));

      const taskIndex = state.tasks.findIndex(t => t.id === action.payload.id);

      state.tasks[taskIndex] = {
        id: state.tasks[taskIndex].id,
        task: {...action.payload.task},
        history: [
          {
            comment: '',
            time: getCurrentTime(),
            previousValue: state.tasks[taskIndex].task,
            author: 'User who updated'
          },
          ...state.tasks[taskIndex].history
        ],
        createdBy: action.payload.createdBy,
        createdAt: action.payload.createdAt
      }
    }
  },
})

export default tasksSlice.reducer;
export const {addTask, editTask, loadTasks} = tasksSlice.actions;
