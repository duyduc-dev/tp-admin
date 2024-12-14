import { type ColumnDef } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import CourseDropdown from '@/components/common/CourseDropdown';
import Input from '@/components/common/Input';
import Table from '@/components/common/Table';
import { useQueryString } from '@/hooks/useQueryString';

import { ChapterRequest, ChapterResponse, useGetChapter } from '../../apis/getChapter';
import CreateNewChapterPage from '../../components/CreateNewChapterModal';

const ChapterList = () => {
  const { t } = useTranslation();

  const [query, setQueryParams] = useQueryString<ChapterRequest>({
    pageNumber: 1,
    pageSize: 10,
  });

  const { data: chapterPage, isFetching } = useGetChapter({
    courseId: query?.courseId ?? undefined,
    ...query,
  });

  const column: ColumnDef<ChapterResponse>[] = [
    {
      accessorKey: 'title',
      header: () => t`title`,
    },
    {
      accessorKey: 'Course',
      header: () => t`course`,
      cell: (item) => item.row.original.course.title,
    },
  ];

  const handleChange = debounce((value: string) => {
    if (value) setQueryParams((p) => ({ ...p, searchKey: value }));
    else
      setQueryParams((p) => {
        p.delete('searchKey');
        return p;
      });
  }, 1000);

  return (
    <div className="p-10">
      <CreateNewChapterPage />
      <div className="mb-4 w-full border-2 border-gray-100 rounded-[12px]">
        <div className="px-4 my-5 gap-2 flex items-center">
          <CourseDropdown
            containerClassName="m-0"
            required={false}
            placeholder="Course "
            courseId={query?.courseId ?? ''}
            onChange={(value) => {
              if (value) setQueryParams((p) => ({ ...p, courseId: value }));
              else
                setQueryParams((p) => {
                  p.delete('courseId');
                  return p;
                });
            }}
          />
          <Input
            autoComplete="off"
            spellCheck="false"
            leftSection={<Search />}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={t`search`}
            className="max-w-[400px]"
            inputClassName="h-[42px]"
          />
        </div>
        <Table
          pagingData={chapterPage}
          tableClassName="w-full"
          headClassName="h-10 border-b-2 border-gray-100"
          columns={column}
          isLoading={isFetching}
          data={chapterPage?.content ?? []}
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

export default ChapterList;
