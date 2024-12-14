import { Navigate, type RouteObject } from 'react-router-dom';

import { AppRoutes } from '@/constants';

import DashboardLayout from './DashboardLayout';

export const dashboardRoutes: RouteObject = {
  path: AppRoutes.DASHBOARD.INDEX,
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      // element: <DashboardMain />,
      element: <Navigate to={AppRoutes.USERS.INDEX} />,
    },
  ],
};
