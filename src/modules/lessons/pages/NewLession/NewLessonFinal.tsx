import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '@/components/common/Spinner';
import { AppRoutes } from '@/constants';
import useNotificationStore from '@/hooks/useNotificationStore.ts';
import { LessonNewRequest, useCreateLesson } from '@/modules/lessons/apis/postNewLesson.ts';
import { selectNewLessonData, setNewLessonData } from '@/modules/lessons/lessonSlice.ts';
import { useAppDispatch, useAppSelector } from '@/stores/hooks.ts';
import { LessonType } from '@/types/lesson.ts';

const NewLessonFinal = () => {
  const { mutateAsync } = useCreateLesson();
  const { addNotification } = useNotificationStore();
  const navigate = useNavigate();
  const newLesson = useAppSelector(selectNewLessonData);
  const dispatch = useAppDispatch();
  const countRef = useRef(0);

  const create = async () => {
    if (!newLesson) return;

    const body: LessonNewRequest = {
      chapterId: newLesson?.chapterId ?? '',
      content: newLesson?.content ?? '',
      document: newLesson?.document ?? '',
      duration: 100,
      previousLessonId: newLesson?.previousLessonId,
      thumbnailUrl: newLesson?.thumbnailUrl ?? '',
      title: newLesson?.title ?? '',
      videoId: newLesson?.videoId ?? undefined,
      type: newLesson?.type ?? LessonType.DOCUMENT,
    };

    await mutateAsync(body);
    addNotification({
      title: 'Create lession succeffuly',
      message: '',
      type: 'success',
    });
    navigate(AppRoutes.LESSON.INDEX);
    dispatch(setNewLessonData(null));
  };

  useEffect(() => {
    if (countRef.current === 0) {
      create();
      countRef.current++;
    }
  }, []);

  return (
    <div className="flex items-center gap-5 font-bold">
      <Spinner size={'lg'} />
      <div>Creating your lesson...</div>
    </div>
  );
};

export default NewLessonFinal;
