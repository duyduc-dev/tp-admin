import { SquareGanttChart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import AppTabs from '@/components/common/AppTabs';
import BreadcrumbHeader from '@/components/common/BreadcrumbHeader';
import { AppRoutes } from '@/constants';

const TransactionLayout = () => {
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
              title: 'transactions',
              path: AppRoutes.TRANSACTION.INDEX,
            },
          ],
        }}
      />
      <AppTabs
        className="px-8 pt-3 mt-4 border-b border-gray-200 gap-x-2"
        tabLabelClass="text-md-semi-bold text-gray-500"
        tabs={[
          {
            to: AppRoutes.TRANSACTION.METRIC,
            label: t('metrics'),
          },
          {
            to: AppRoutes.TRANSACTION.INDEX,
            label: t('list'),
          },
        ]}
      />
      <Outlet />
    </>
  );
};

export default TransactionLayout;
