import {combineReducers, configureStore} from '@reduxjs/toolkit';
import tasksSlice from './tasksSlice';


const rootReducer = combineReducers({
  tasks: tasksSlice
})


export const store = () => configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
