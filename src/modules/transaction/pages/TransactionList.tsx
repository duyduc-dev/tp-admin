import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import useGetTransaction, { TransactionRequest, TransactionResponse } from '@/apis/transactions.ts';
import Input from '@/components/common/Input';
import Table from '@/components/common/Table';
import { FormatDate } from '@/constants';
import { useQueryString } from '@/hooks/useQueryString.ts';
import { formatDate, formatNumber, templateString } from '@/utilities/helper.ts';

const TransactionList = () => {
  const { t } = useTranslation();
  const [queryParams, setQueryParams] = useQueryString<TransactionRequest>();
  const { data } = useGetTransaction({ ...queryParams });

  const timeoutSearch = useRef<any>();

  const column: ColumnDef<TransactionResponse>[] = [
    {
      accessorKey: 'fullName',
      header: () => t`fullName`,
      cell: (item) =>
        templateString`${item.row.original.user.firstName} ${item.row.original.user.lastName}`,
    },
    {
      accessorKey: 'amount',
      header: () => t`amount`,
      cell: (item) => formatNumber(item.row.original.amount),
    },
    {
      accessorKey: 'status',
      header: () => t`status`,
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
    {
      accessorKey: 'createAt',
      header: () => t`createAt`,
      cell: (item) => formatDate(item.row.original.createAt, FormatDate.FULL),
    },
  ];

  const handleSearch = (val: string) => {
    if (timeoutSearch.current !== undefined) {
      clearTimeout(timeoutSearch.current);
    }
    timeoutSearch.current = setTimeout(() => {
      setQueryParams((q) => {
        if (!val) {
          q.set('pageNumber', '1');
          q.delete('searchKey');
          return q;
        }
        q.set('pageNumber', '1');
        q.set('searchKey', val);
        return q;
      });
    }, 800);
  };

  return (
    <div className="px-10 py-8">
      <div className="w-full border-2 border-gray-100 rounded-[12px]">
        <div className="px-4 py-5">
          <Input
            autoComplete="off"
            spellCheck="false"
            leftSection={<Search />}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t`search`}
            className="max-w-[400px]"
          />
        </div>
        <Table
          className="w-full"
          tableClassName="w-full"
          headClassName="h-10 border-b-2 border-gray-100"
          columns={column}
          data={data?.content ?? []}
          onPagingDataChange={(value) =>
            setQueryParams((prevSearchParams) => {
              prevSearchParams.set('pageNumber', String(value.pageNumber));
              prevSearchParams.set('pageSize', String(value.pageSize));
              return prevSearchParams;
            })
          }
        />
      </div>
    </div>
  );
};

export default TransactionList;
