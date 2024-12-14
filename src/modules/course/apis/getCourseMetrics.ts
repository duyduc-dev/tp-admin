import { useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios.ts';

type CourseMetricResponse = {
  label: string;
  data: number;
};

const getCourseMetrics = async () => {
  const res = await httpRequest.get<CourseMetricResponse[]>(ApiPath.COURSES.METRICS);
  return res.data;
};

export const useGetCourseMetric = () =>
  useQuery({
    queryKey: ['course-metrics'],
    queryFn: getCourseMetrics,
    gcTime: 5000,
  });
