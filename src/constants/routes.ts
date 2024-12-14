export const AppRoutes = Object.freeze({
  INDEX: '/',
  AUTH: {
    INDEX: '/auth',
  },
  DASHBOARD: {
    INDEX: '/dashboard',
  },
  USERS: {
    INDEX: '/users',
    DETAIL: '/users/:username',
  },
  COURSES: {
    INDEX: '/courses',
    METRICS: '/courses/metrics',
    CREATE_COURSE: '/courses/new',
    POST_COURSE_VIDEO: '/courses/post-video',
  },
  CHAPTER: {
    INDEX: '/chapter',
  },
  LESSON: {
    INDEX: '/lessons',
    NEW_LESSON: '/lessons/new',
    NEW_LESSON_INPUT_CONTENT: '/lessons/new/content',
    NEW_LESSON_INPUT_DOCUMENT: '/lessons/new/document',
    NEW_LESSON_VIDEO: '/lessons/new/video',
    CREATE_LESSON: '/lessons/new/final',
  },
  TRANSACTION: {
    INDEX: '/transactions',
    METRIC: '/transactions/metrics',
  },
});
