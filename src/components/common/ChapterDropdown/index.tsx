import { FC, useState } from 'react';

import useGetChapterInfinity, {
  ChapterRequest,
  ChapterResponse,
} from '@/modules/chapter/apis/getChapter';

import { DropdownStandard } from '../DropdownStandard';

type Props = {
  courseId?: string;
  onChange?: (val?: string) => void;
  label?: string;
  defaultValue?: string;
};

const ChapterDropdown: FC<Props> = ({ label, courseId, defaultValue, onChange }) => {
  const [queryParams, setQueryParams] = useState<ChapterRequest>({
    pageNumber: 1,
    pageSize: 10,
    searchKey: '',
  });

  const {
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    data: chapterPage,
  } = useGetChapterInfinity({
    courseId: courseId || '',
    ...queryParams,
  });

  const parseDropdownOptions = () => {
    const data =
      chapterPage?.pages?.reduce((prev, curr) => {
        return prev.concat(curr.content);
      }, [] as ChapterResponse[]) ?? [];

    return data.map((item) => ({
      label: `${item.title}`,
      value: item.id,
    }));
  };

  return (
    <div className="mt-5">
      <DropdownStandard
        containerClassName="min-w-[400px]"
        ulClassName="max-h-[30vh]"
        label={label}
        required
        disabled={!courseId}
        onChange={(val) => onChange?.(val as string)}
        canSearch
        defaultValue={defaultValue}
        isLoading={isLoading}
        onSearchViaApi={(value) => {
          setQueryParams((p) => ({ ...p, searchKey: value }));
        }}
        options={parseDropdownOptions()}
        showClearIcon
        isFetchingNextPage={isFetchingNextPage}
        onFetchingLoadMore={fetchNextPage}
      />
    </div>
  );
};

export default ChapterDropdown;
