import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';
import { HttpResponse } from '@/https/types.ts';
import { PagingResponse, SystemStatus } from '@/types/common';

export type ChapterRequest = {
  pageNumber?: number;
  pageSize?: number;
  sortType?: 'ASC' | 'DESC';
  searchKey?: string;
  courseId?: string;
};

export type ChapterResponse = {
  id: string;
  title: string;
  previousChapterId: number;
  courseId: string;
  systemStatus: SystemStatus;
  createAt: number;
  updateAt: number;
  course: CourseRes;
};

type CourseRes = {
  title: string;
  slug: string;
  viewed: number;
  description: string;
  price: number;
  code: string;
  discount: number;
  registered: boolean;
};

type TResult = PagingResponse<ChapterResponse>;

const getPageChapter = async (params: ChapterRequest = {}) => {
  const res = await httpRequest.get<TResult>(ApiPath.CHAPTER.PAGE, {
    params: params,
  });
  return res.data;
};

const useGetChapterInfinity = (req: ChapterRequest = {}) =>
  useInfiniteQuery<TResult, Error, InfiniteData<TResult, HttpResponse>>({
    queryKey: ['chapter-infinity', req],
    queryFn: ({ pageParam = req }) => {
      return getPageChapter(pageParam as ChapterRequest);
    },
    getNextPageParam: (lastPage) => {
      const { pageNumber, totalPages } = lastPage;
      return pageNumber < totalPages ? { ...req, pageNumber: pageNumber + 1 } : undefined;
    },
    initialPageParam: { ...req },
  });

export const useGetChapter = (req: ChapterRequest = {}) =>
  useQuery({
    queryKey: ['chapter', req],
    queryFn: () => {
      return getPageChapter(req);
    },
  });

export default useGetChapterInfinity;
