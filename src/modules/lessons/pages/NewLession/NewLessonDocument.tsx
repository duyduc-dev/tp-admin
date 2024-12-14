import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import MyButton from '@/components/common/Button';
import TinymceEditor from '@/components/common/TinymceEditor';
import { AppRoutes } from '@/constants';
import { selectNewLessonData, setNewLessonData } from '@/modules/lessons/lessonSlice.ts';
import { useAppDispatch, useAppSelector } from '@/stores/hooks.ts';
import { LessonType } from '@/types/lesson.ts';

const NewLessonDocument = () => {
  const { t } = useTranslation();

  const newLessonData = useAppSelector(selectNewLessonData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (newLessonData?.type === LessonType.VIDEO) navigate(AppRoutes.LESSON.NEW_LESSON_VIDEO);
    else navigate(AppRoutes.LESSON.CREATE_LESSON);
  };

  return (
    <div className="max-w-[720px]" data-color-mode="light">
      <h3 className="mb-5 text-[16px] text-lg-bold">{t`Enter your document`}</h3>
      <TinymceEditor
        onEditorChange={(data) => {
          dispatch(
            setNewLessonData({
              ...newLessonData,
              document: data,
            }),
          );
        }}
      />

      <div className="flex justify-end mt-5">
        <MyButton onClick={handleContinue} type="submit">{t`continue`}</MyButton>
      </div>
    </div>
  );
};

export default NewLessonDocument;
