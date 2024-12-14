import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios.ts';
import { HttpResponse } from '@/https/types.ts';
import { PagingResponse } from '@/types/common.ts';
import { LessonDetail } from '@/types/lesson.ts';

export type LessonListQueryParams = {
  pageNumber?: number;
  pageSize?: number;
  isAscSort?: boolean;
  searchKey?: string;
  courseId?: string;
  chapterId?: string;
};

type LessonResult = PagingResponse<LessonDetail>;

const getLessonList = async (queryParams: LessonListQueryParams = {}) => {
  const res = await httpRequest.get<LessonResult>(ApiPath.LESSON.PAGE, { params: queryParams });
  return res.data;
};

export const useGetLessonInfinity = (req: LessonListQueryParams = {}) =>
  useInfiniteQuery<LessonResult, Error, InfiniteData<LessonResult, HttpResponse>>({
    queryKey: ['lesson-infinity', req],
    queryFn: ({ pageParam = req }) => {
      return getLessonList(pageParam as LessonListQueryParams);
    },
    getNextPageParam: (lastPage) => {
      const { pageNumber, totalPages } = lastPage;
      return pageNumber < totalPages ? { ...req, pageNumber: pageNumber + 1 } : undefined;
    },
    initialPageParam: { ...req },
  });
