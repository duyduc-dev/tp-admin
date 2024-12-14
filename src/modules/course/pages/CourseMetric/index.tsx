import { useTranslation } from 'react-i18next';

import PieChartV2 from '@/components/common/PieChartV2';
import { pieChartColor } from '@/constants/pieChartColors.ts';
import { useGetCourseMetric } from '@/modules/course/apis/getCourseMetrics.ts';
import { calculatePercent, cn } from '@/utilities/helper.ts';

const CourseMetric = () => {
  const { data = [] } = useGetCourseMetric();
  const { t } = useTranslation();
  const totalAmount = data.reduce((prev, curr) => prev + curr.data, 0) || 0;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
      <div className="prevent-zoom relative h-[200px] w-1/2">
        <div className="z-1 absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col text-center">
          <p className="text-[10px] font-medium leading-[14px]">{t('totalRegisteredCourse')}</p>
          <p className="text-[25.7143px] font-bold leading-[31px]">{totalAmount}</p>
        </div>
        <PieChartV2
          data={
            data?.length
              ? data?.map((item, idx) => ({
                  id: item.label,
                  label: item.label,
                  value: +item.data.toFixed(2),
                  color: Object.values(pieChartColor)[idx],
                }))
              : [
                  {
                    id: '',
                    label: 'empty',
                    value: 0,
                    color: '#F2F4F7',
                  },
                ]
          }
          innerRadius={0.75}
          isInteractive={!!data?.length}
          // tooltip={CustomTooltipSpendByCategoryChart}
          padAngle={0.5}
        />
      </div>
      <div className="w-fit">
        <div className="flex w-full flex-col gap-2">
          {data?.map((item, idx) => {
            return (
              <div key={idx} className="flex w-full items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <div className={cn('h-2 w-2 rounded-full', Object.keys(pieChartColor)[idx])} />

                  <p className="text-sm-regular text-gray-600">{item.label}</p>
                </div>

                <p className="whitespace-nowrap text-sm-regular text-gray-600">
                  {calculatePercent(item.data, totalAmount, true)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseMetric;
