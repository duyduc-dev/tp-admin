import { InfiniteData, QueryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';
import { HttpResponse } from '@/https/types.ts';
import { ChapterRequest } from '@/modules/chapter/apis/getChapter.ts';
import { PagingResponse } from '@/types/common';
import { CourseDetail } from '@/types/course';

export type CourseListQueryParams = {
  pageNumber?: number;
  pageSize?: number;
  sortType?: 'ASC' | 'DESC';
  sortTypeDate?: 'ASC' | 'DESC';
  searchKey?: string;
};

type TResult = PagingResponse<CourseDetail>;

const getPageList = async (params: CourseListQueryParams = {}) => {
  const res = await httpRequest.get<TResult>(ApiPath.COURSES.PAGE, {
    params: params,
  });
  return res.data;
};

type Config = QueryOptions<TResult> & { enabled?: boolean };

const useGetCoursesList = ({
  queryParams,
  config = {},
}: {
  queryParams: CourseListQueryParams;
  config?: Config;
}) =>
  useQuery({
    queryKey: ['course-list', queryParams],
    queryFn: () => getPageList(queryParams),
    gcTime: 60 * 5 * 1000,
    ...config,
  });

export const useGetCourseInfinity = (req: ChapterRequest = {}) =>
  useInfiniteQuery<TResult, Error, InfiniteData<TResult, HttpResponse>>({
    queryKey: ['course-infinity', req],
    queryFn: ({ pageParam = req }) => {
      return getPageList(pageParam as ChapterRequest);
    },
    getNextPageParam: (lastPage) => {
      const { pageNumber, totalPages } = lastPage;
      return pageNumber < totalPages ? { ...req, pageNumber: pageNumber + 1 } : undefined;
    },
    initialPageParam: { ...req },
  });

export default useGetCoursesList;
