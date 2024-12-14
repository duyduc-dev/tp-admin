import { combineReducers } from '@reduxjs/toolkit';

import courseReducer from '@/modules/course/courseSlice';
import lessonReducer from '@/modules/lessons/lessonSlice.ts';

import appReducer from './appSlice';

const rootReducer = combineReducers({
  app: appReducer,
  course: courseReducer,
  lesson: lessonReducer,
});

export default rootReducer;
