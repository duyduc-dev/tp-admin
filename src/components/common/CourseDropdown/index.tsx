import { FC, useState } from 'react';

import { CourseListQueryParams, useGetCourseInfinity } from '@/modules/course/apis/getPageCourse';
import { CourseDetail } from '@/types/course.ts';
import { cn } from '@/utilities/helper.ts';

import { DropdownStandard } from '../DropdownStandard';

type Props = {
  courseId: string;
  onChange?: (value?: string) => void;
  label?: string;
  required?: boolean;
  containerClassName?: string;
  placeholder?: string;
};

const CourseDropdown: FC<Props> = ({
  label,
  courseId,
  onChange,
  required = true,
  containerClassName,
  placeholder,
}) => {
  const [queryParams, setQueryParams] = useState<CourseListQueryParams>({
    pageNumber: 1,
    pageSize: 10,
    searchKey: '',
  });

  const {
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    data: coursePage,
  } = useGetCourseInfinity({
    courseId: courseId || '',
    ...queryParams,
  });

  const parseDropdownOptions = () => {
    const data =
      coursePage?.pages?.reduce((prev, curr) => {
        return prev.concat(curr.content);
      }, [] as CourseDetail[]) ?? [];

    return data.map((item) => ({
      label: `${item.title}`,
      value: item.id,
    }));
  };

  return (
    <div className={cn('mt-5', containerClassName)}>
      <DropdownStandard
        containerClassName="min-w-[400px]"
        ulClassName="max-h-[30vh]"
        label={label}
        required={required}
        onChange={(val) => onChange?.(val as string)}
        canSearch
        placeholder={placeholder}
        defaultValue={courseId}
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

export default CourseDropdown;
