import {createBrowserRouter, Navigate} from "react-router-dom";
import TaskBoardPage from "../pages/TaskBoardPage";
import TaskPage from "../pages/TaskPage";


export const router = createBrowserRouter([
  {
    path: '/tasks',
    element: <TaskBoardPage/>
  },
  {
    path: '/tasks/:taskId',
    element: <TaskPage/>
  },
  {
    path: '/tasks/new',
    element: <TaskPage newTask/>
  },
  {
    path: '/',
    element: <Navigate to='/tasks'/>
  }
])

