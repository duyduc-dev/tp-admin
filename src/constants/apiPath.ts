export const ApiPath = Object.freeze({
  USERS: {
    PAGE: '/user/page',
    USERNAME: '/user/username/:username',
    USER_COURSE: '/user/:userId/course',
  },
  COURSES: {
    PAGE: '/courses/page',
    CREATE_NEW: '/courses/add',
    METRICS: '/courses/metrics',
    GET_DETAIL_BY_SLUG: '/courses/slug/:slug',
    DELETE_BY_ID: '/courses/:id',
  },
  LESSON: {
    INDEX: '/lesson',
    PAGE: '/lesson/page',
  },
  UPLOAD: {
    INDEX: '/upload',
  },
  TRANSACTION: {
    PAGE: '/transaction/page',
  },
  CHAPTER: {
    INDEX: '/chapter',
    PAGE: '/chapter/page',
  },
});
