import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import MyButton from '@/components/common/Button';
import TinymceEditor from '@/components/common/TinymceEditor';
import { AppRoutes } from '@/constants';
import { selectNewLessonData, setNewLessonData } from '@/modules/lessons/lessonSlice.ts';
import { useAppDispatch, useAppSelector } from '@/stores/hooks.ts';

const NewLessonContent = () => {
  const { t } = useTranslation();

  const newLessonData = useAppSelector(selectNewLessonData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(AppRoutes.LESSON.NEW_LESSON_INPUT_DOCUMENT);
  };

  return (
    <div className="max-w-[720px]" data-color-mode="light">
      <h3 className="mb-5 text-[16px] text-lg-bold">{t`Enter your content`}</h3>
      <TinymceEditor
        initialValue={newLessonData?.content}
        onEditorChange={(data) => {
          dispatch(
            setNewLessonData({
              ...newLessonData,
              content: data,
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

export default NewLessonContent;
