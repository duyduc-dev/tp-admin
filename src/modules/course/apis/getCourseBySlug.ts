import { useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';
import { CourseDetail } from '@/types/course';
import { replacePathDynamic } from '@/utilities/helper';

const getCourseBySlug = async (slug: string) => {
  const res = await httpRequest.get<CourseDetail>(
    replacePathDynamic(ApiPath.COURSES.GET_DETAIL_BY_SLUG, {
      slug,
    }),
  );
  return res.data;
};

export const useGetCourseBySlug = (slug: string) =>
  useQuery({
    queryKey: getQueryClientCourseBySlugKey(slug),
    queryFn: () => getCourseBySlug(slug),
  });

export const getQueryClientCourseBySlugKey = (slug: string) => ['course-by-slug', slug];
