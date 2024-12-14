import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import MyButton from '@/components/common/Button';
import Input from '@/components/common/Input';
import AppVideo from '@/components/common/Video';
import { AppRoutes } from '@/constants';
import { selectNewLessonData, setNewLessonData } from '@/modules/lessons/lessonSlice.ts';
import { useAppDispatch, useAppSelector } from '@/stores/hooks.ts';
import { getYouTubeVideoCode } from '@/utilities/helper.ts';

const NewLessonVideo = () => {
  const [value, setValue] = useState('');

  const newLessonData = useAppSelector(selectNewLessonData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleContinue = () => {
    dispatch(
      setNewLessonData({
        ...newLessonData,
        videoId: getYouTubeVideoCode(value) ?? '',
      }),
    );
    navigate(AppRoutes.LESSON.CREATE_LESSON);
  };

  return (
    <div className="max-w-[720PX]">
      <Input
        value={value}
        label={'Enter your video URL'}
        onChange={(e) => setValue(e.target.value)}
        placeholder={'https://www.youtube.com'}
      />
      {getYouTubeVideoCode(value) && (
        <div className="mt-5">
          <AppVideo videoId={getYouTubeVideoCode(value) ?? ''} />
        </div>
      )}
      <div className="flex justify-end mt-5">
        <MyButton onClick={handleContinue} type="submit">{t`continue`}</MyButton>
      </div>
    </div>
  );
};

export default NewLessonVideo;
