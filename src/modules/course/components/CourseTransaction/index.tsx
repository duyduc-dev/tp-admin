import { type ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import useGetTransaction, { TransactionResponse } from '@/apis/transactions';
import Avatar from '@/components/common/Avatar';
import Table from '@/components/common/Table';
import { formatNumber } from '@/utilities/helper';

type Props = {
  courseId: string;
};

const CourseTransaction: FC<Props> = ({ courseId }) => {
  const { data } = useGetTransaction({ referenceId: courseId });
  const { t } = useTranslation();

  const column: ColumnDef<TransactionResponse>[] = [
    {
      accessorKey: 'avatar',
      header: () => t`avatar`,
      cell: (item) => (
        <div className="flex flex-col items-center">
          <Avatar size={40} src={item.row.original.user.profileImage} />
          <p>
            {item.row.original.user.firstName} {item.row.original.user.lastName}
          </p>
        </div>
      ),
      maxSize: 70,
    },
    {
      accessorKey: 'amount',
      header: () => t`amount` + '(VND)',
      cell: (item) => formatNumber(item.row.original.amount),
      maxSize: 80,
    },
    {
      accessorKey: 'status',
      header: () => t`status`,
      maxSize: 80,
    },
    {
      accessorKey: 'note',
      header: () => t`note`,
    },

    {
      accessorKey: 'email',
      header: () => t`email`,
      cell: (item) => item.row.original.user.email,
    },
  ];

  return (
    <div className="mb-4 w-full border-2 border-gray-100 rounded-[12px]">
      <Table
        tableClassName="w-full"
        headClassName="h-10 border-b-2 border-gray-100"
        className="w-full"
        columns={column}
        data={data?.content ?? []}
      />
    </div>
  );
};

export default CourseTransaction;
