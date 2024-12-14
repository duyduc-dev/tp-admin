import { SquareGanttChart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import AppTabs from '@/components/common/AppTabs';
import BreadcrumbHeader from '@/components/common/BreadcrumbHeader';
import { AppRoutes } from '@/constants';

const LessonLayout = () => {
  const { t } = useTranslation();
  return (
    <>
      <BreadcrumbHeader
        breadcrumb={{
          icon: <SquareGanttChart color="#667085" size={20} />,
          items: [
            {
              title: 'Techplatform',
              path: AppRoutes.DASHBOARD.INDEX,
            },
            {
              title: 'courses',
              path: AppRoutes.COURSES.INDEX,
            },
            {
              title: 'lessons',
              path: AppRoutes.LESSON.INDEX,
            },
          ],
        }}
      />
      <AppTabs
        className="px-8 pt-3 mt-4 border-b border-gray-200 gap-x-2"
        tabLabelClass="text-md-semi-bold text-gray-500"
        tabs={[
          {
            to: AppRoutes.LESSON.INDEX,
            label: t('list'),
          },
        ]}
      />
      <Outlet />
    </>
  );
};

export default LessonLayout;
