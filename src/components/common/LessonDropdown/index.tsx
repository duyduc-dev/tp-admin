import { useState } from 'react';

import { DropdownStandard } from '@/components/common/DropdownStandard';
import {
  LessonListQueryParams,
  useGetLessonInfinity,
} from '@/modules/lessons/apis/getLessonList.ts';
import { LessonDetail } from '@/types/lesson.ts';

type Props = {
  label?: string;
  courseId?: string;
  chapterId?: string;
  onChange?: (val: string) => void;
  defaultValue?: string;
};

const LessonDropdown = ({ label, courseId, chapterId, onChange, defaultValue }: Props) => {
  const [queryParams, setQueryParams] = useState<LessonListQueryParams>({
    pageNumber: 1,
    pageSize: 10,
    searchKey: '',
  });

  const {
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    data: lessonPage,
  } = useGetLessonInfinity({
    courseId: courseId || undefined,
    chapterId,
    ...queryParams,
  });

  const parseDropdownOptions = () => {
    const data =
      lessonPage?.pages?.reduce((prev, curr) => {
        return prev.concat(curr.content);
      }, [] as LessonDetail[]) ?? [];

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

export default LessonDropdown;
