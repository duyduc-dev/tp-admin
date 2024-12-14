import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';

import FormLogoHeader from '@/components/common/FormLogoHeader';
import StepsRoute from '@/components/common/Steps/StepsRoute.tsx';
import { AppRoutes } from '@/constants';
import { selectNewLessonData } from '@/modules/lessons/lessonSlice.ts';
import { useAppSelector } from '@/stores/hooks.ts';
import { LessonType } from '@/types/lesson.ts';

const NewLessonPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const newLessonData = useAppSelector(selectNewLessonData);

  const steps = useMemo(() => {
    const data = [
      {
        label: t`createNewLesson`,
        url: AppRoutes.LESSON.NEW_LESSON,
      },
      {
        label: t`enterContent`,
        url: AppRoutes.LESSON.NEW_LESSON_INPUT_CONTENT,
      },
      {
        label: t`enterDocument`,
        url: AppRoutes.LESSON.NEW_LESSON_INPUT_DOCUMENT,
      },
    ];

    if (newLessonData?.type === LessonType.VIDEO) {
      data.push({
        label: t`createYourVideo`,
        url: AppRoutes.LESSON.NEW_LESSON_VIDEO,
      });
    }

    const final = {
      label: t`createLesson`,
      url: AppRoutes.LESSON.CREATE_LESSON,
    };

    data.push(final);

    return data;
  }, [newLessonData]);

  return (
    <div>
      <FormLogoHeader title={t`createNewLesson`} onClose={() => navigate(AppRoutes.LESSON.INDEX)} />
      <div className="flex gap-20 px-10 py-8">
        <div className="min-w-[300px]">
          <StepsRoute steps={steps} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full gap-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLessonPage;
