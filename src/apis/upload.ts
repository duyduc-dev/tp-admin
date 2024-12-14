import { MutationOptions, useMutation } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';
import GenericApi from '@/https/GenericApi.ts';

export enum UploadFileType {
  COURSE = 'COURSE',
  LESSON = 'LESSON',
}

export type UploadFileRequest = {
  type: UploadFileType;
  file: FormData;
};

export type UploadFileResponse = {
  url: string;
  type: UploadFileType;
  publicId: string;
};

const uploadApi = async ({ type, file }: UploadFileRequest): Promise<UploadFileResponse> => {
  const res = await httpRequest.post<FormData, UploadFileResponse>(ApiPath.UPLOAD.INDEX, file, {
    params: { type },
    headers: {
      'content-type': GenericApi.CT_MULTIPART,
    },
  });
  return res.data;
};

export const useUploadFile = (
  config?: MutationOptions<UploadFileResponse, Error, UploadFileRequest>,
) => {
  return useMutation({
    mutationFn: uploadApi,
    ...config,
  });
};
