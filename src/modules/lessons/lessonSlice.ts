import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { LessonNewRequestPartial } from '@/modules/lessons/apis/postNewLesson.ts';
import { RootState } from '@/stores';
import { getPropertyObject } from '@/utilities/helper';

type LessonState = {
  newLessonData: LessonNewRequestPartial | null;
};

const lessonInit: LessonState = {
  newLessonData: null,
};

const lessonSlice = createSlice({
  name: 'lesson',
  initialState: lessonInit,
  reducers: {
    setNewLessonData: (state, action: PayloadAction<LessonNewRequestPartial | null>) => {
      state.newLessonData = action.payload;
    },
  },
});

const { reducer: lessonReducer, actions } = lessonSlice;

export const { setNewLessonData } = actions;

export const lessonSelector = (state: RootState) => state.lesson || lessonInit;
export const selectNewLessonData = createSelector(lessonSelector, (state) =>
  getPropertyObject(state, 'newLessonData'),
);

export default lessonReducer;
