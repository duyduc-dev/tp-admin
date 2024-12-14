import { type RouteObject } from 'react-router-dom';

import { AppRoutes } from '@/constants';
import TransactionList from '@/modules/transaction/pages/TransactionList.tsx';
import TransactionMetrics from '@/modules/transaction/pages/TransactionMetrics.tsx';
import TransactionLayout from '@/modules/transaction/TransactionLayout.tsx';

export const transactionRoutes: RouteObject = {
  path: AppRoutes.TRANSACTION.INDEX,
  element: <TransactionLayout />,
  children: [
    {
      index: true,
      element: <TransactionList />,
    },
    {
      path: AppRoutes.TRANSACTION.METRIC,
      element: <TransactionMetrics />,
    },
  ],
};
