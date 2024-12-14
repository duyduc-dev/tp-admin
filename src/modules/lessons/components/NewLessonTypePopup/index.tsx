import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import MyButton from '@/components/common/Button';
import { AppRoutes } from '@/constants';

const NewLessonTypePopup = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <MyButton leftIcon={<Plus />} onClick={() => navigate(AppRoutes.LESSON.NEW_LESSON)}>
      {t`newLesson`}
    </MyButton>
  );
};

export default NewLessonTypePopup;
