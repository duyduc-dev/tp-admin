import { useMutation } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios.ts';
import { LessonType } from '@/types/lesson';

export type LessonNewRequestPartial = Partial<LessonNewRequest> & {
  courseId?: string;
  previewUrl?: string;
};
export type ThumbnailMetaData = {};
export type LessonNewRequest = {
  title: string;
  type: LessonType;
  thumbnailUrl: string;
  content: string;
  chapterId: string;
  previousLessonId?: string;
  duration: number;

  // video
  videoId?: string;

  // question
  question?: string;

  // document
  document: string;
};

const createNewLesson = async (req: LessonNewRequest) => {
  const res = await httpRequest.post(ApiPath.LESSON.INDEX, req);
  return res.data;
};

export const useCreateLesson = () =>
  useMutation({
    mutationKey: ['create-lesson'],
    mutationFn: createNewLesson,
  });
