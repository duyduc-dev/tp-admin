import { ImagePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { UploadFileType, useUploadFile } from '@/apis/upload.ts';
import MyButton from '@/components/common/Button';
import ChapterDropdown from '@/components/common/ChapterDropdown';
import CourseDropdown from '@/components/common/CourseDropdown';
import { DropdownStandard } from '@/components/common/DropdownStandard';
import Input from '@/components/common/Input';
import LessonDropdown from '@/components/common/LessonDropdown';
import { AppRoutes } from '@/constants';
import { selectNewLessonData, setNewLessonData } from '@/modules/lessons/lessonSlice.ts';
import { useAppDispatch, useAppSelector } from '@/stores/hooks.ts';
import { LessonType } from '@/types/lesson.ts';

const NewLessonData = () => {
  const fileTypes = ['JPG', 'PNG', 'GIF'];

  const newLessonData = useAppSelector(selectNewLessonData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutateAsync: uploadAsync, isPending: isLoadingUploadFile } = useUploadFile();
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);

  const { register, watch, setValue, handleSubmit } = useForm({
    defaultValues: newLessonData || {},
  });

  const handleChange = (file: File) => {
    setFile(file);
  };
  const handleCourseChange = (val?: string) => {
    setValue('courseId', val ?? '');
  };
  const handleChapterChange = (val?: string) => {
    setValue('chapterId', val ?? '');
  };
  const handleLessonChange = (val?: string) => {
    setValue('previousLessonId', val ?? '');
  };

  const saveLessonData = handleSubmit(async (values) => {
    let _publicId = newLessonData?.thumbnailUrl;
    let _url = newLessonData?.previewUrl;
    if (file) {
      const formData = new FormData();
      formData.append('image', file as any);
      const { publicId, url } = await uploadAsync({
        file: formData,
        type: UploadFileType.COURSE,
      });
      _url = url;
      _publicId = publicId;
    }

    dispatch(setNewLessonData({ ...values, thumbnailUrl: _publicId, previewUrl: _url }));
    navigate(AppRoutes.LESSON.NEW_LESSON_INPUT_CONTENT);
  });

  useEffect(() => {
    if (file && !newLessonData?.previewUrl) {
      const objectUrl = URL.createObjectURL(file);
      dispatch(setNewLessonData({ ...newLessonData, previewUrl: objectUrl }));
    }
    return () => {
      file && newLessonData?.previewUrl && URL.revokeObjectURL(newLessonData?.previewUrl);
      // dispatch(setNewLessonData({ ...newLessonData, previewUrl: undefined }));
    };
  }, [file]);

  return (
    <form onSubmit={saveLessonData} className="max-w-[720px]">
      <Input
        required
        register={register('title')}
        label={t('titleOfLesson')}
        className="w-ful"
        inputClassName="h-[40px]"
        placeholder="Eg: React"
      />
      <DropdownStandard
        containerClassName="mt-5"
        label="Lesson type"
        required
        selectedValue={watch('type')}
        onChange={(value) => setValue('type', (value as LessonType) || LessonType.DOCUMENT)}
        options={Object.keys(LessonType).map((item) => ({ label: item, value: item }))}
      ></DropdownStandard>
      <CourseDropdown
        label={t`course`}
        onChange={handleCourseChange}
        courseId={watch('courseId') ?? ''}
      />
      <ChapterDropdown
        label="Chapter"
        defaultValue={watch('chapterId')}
        onChange={handleChapterChange}
        courseId={watch('courseId')}
      />
      <LessonDropdown
        label="Previous Lesson"
        defaultValue={watch('previousLessonId')}
        onChange={handleLessonChange}
        courseId={watch('courseId')}
        chapterId={watch('chapterId')}
      />
      <div className="mt-5">
        <p className="text-sm-regular text-gray-600 mb-2">Thumbnail</p>
        <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
          <div className="flex items-center gap-4 p-6 border border-dashed border-gray-300 rounded-[8px]">
            <ImagePlus size={36} />
            <p className="text-gray-700 text-sm-medium">{t`dragYourPictureHere`}</p>
          </div>
        </FileUploader>
        {newLessonData?.previewUrl && (
          <div className="self-start inline-block mt-6 overflow-hidden border border-gray-300 rounded-lg">
            <img className="h-[300px] object-cover" src={newLessonData.previewUrl} alt="" />
          </div>
        )}
      </div>
      <div className="flex justify-end mt-5">
        <MyButton loading={isLoadingUploadFile} type="submit">{t`continue`}</MyButton>
      </div>
    </form>
  );
};

export default NewLessonData;
