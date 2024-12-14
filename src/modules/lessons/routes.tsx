import { type RouteObject } from 'react-router-dom';

import { AppRoutes } from '@/constants';
import NewLessonPage from '@/modules/lessons/pages/NewLession';
import NewLessonContent from '@/modules/lessons/pages/NewLession/NewLessonContent.tsx';
import NewLessonData from '@/modules/lessons/pages/NewLession/NewLessonData.tsx';
import NewLessonDocument from '@/modules/lessons/pages/NewLession/NewLessonDocument.tsx';
import NewLessonFinal from '@/modules/lessons/pages/NewLession/NewLessonFinal.tsx';
import NewLessonVideo from '@/modules/lessons/pages/NewLession/NewLessonVideo.tsx';

import LessonLayout from './LessonLayout';
import LessonList from './pages/LessonList';

export const lessonsRoutes: RouteObject = {
  path: AppRoutes.LESSON.INDEX,
  element: <LessonLayout />,
  children: [
    {
      index: true,
      element: <LessonList />,
    },
  ],
};

export const newLessonsRoutes: RouteObject = {
  path: AppRoutes.LESSON.NEW_LESSON,
  element: <NewLessonPage />,
  children: [
    {
      index: true,
      element: <NewLessonData />,
    },
    {
      path: AppRoutes.LESSON.NEW_LESSON_INPUT_CONTENT,
      element: <NewLessonContent />,
    },
    {
      path: AppRoutes.LESSON.NEW_LESSON_INPUT_DOCUMENT,
      element: <NewLessonDocument />,
    },
    {
      path: AppRoutes.LESSON.NEW_LESSON_VIDEO,
      element: <NewLessonVideo />,
    },
    {
      path: AppRoutes.LESSON.CREATE_LESSON,
      element: <NewLessonFinal />,
    },
  ],
};
