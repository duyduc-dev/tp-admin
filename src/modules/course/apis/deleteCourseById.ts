import { MutationOptions, useMutation } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';
import { replacePathDynamic } from '@/utilities/helper.ts';

const deleteCourseById = async (courseId: string) => {
  const res = await httpRequest.delete(
    replacePathDynamic(ApiPath.COURSES.DELETE_BY_ID, { id: courseId }),
  );
  return res.data;
};

export const useDeleteCourseById = (config: MutationOptions<any, Error, any>) =>
  useMutation({
    mutationFn: deleteCourseById,
    ...config,
  });
