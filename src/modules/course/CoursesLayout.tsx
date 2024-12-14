import { SquareGanttChart } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';

import AppTabs from '@/components/common/AppTabs';
import BreadcrumbHeader from '@/components/common/BreadcrumbHeader';
import { AppRoutes } from '@/constants';

const CoursesLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const items = useMemo(() => {
    const nav = [
      {
        title: 'Techplatform',
        path: AppRoutes.DASHBOARD.INDEX,
      },
      {
        title: 'courses',
        path: AppRoutes.COURSES.INDEX,
      },
    ];
    if (location.pathname.includes('metrics')) {
      nav.push({
        title: 'metrics',
        path: AppRoutes.COURSES.METRICS,
      });
    }
    return nav;
  }, [location.pathname]);

  return (
    <>
      <BreadcrumbHeader
        breadcrumb={{
          icon: <SquareGanttChart color="#667085" size={20} />,
          items: items,
        }}
      />
      <AppTabs
        className="px-8 pt-3 mt-4 border-b border-gray-200 gap-x-2"
        tabLabelClass="text-md-semi-bold text-gray-500"
        tabs={[
          {
            to: AppRoutes.COURSES.INDEX,
            label: t('list'),
          },
          {
            to: AppRoutes.COURSES.METRICS,
            label: t`metrics`,
          },
        ]}
      />
      <Outlet />
    </>
  );
};

export default CoursesLayout;
