import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';

import { sleep } from '@/utilities/helper.ts';

Chart.register(...registerables); // Register all Chart.js components

export type MetricData = {
  label: string;
  data: number;
};

type Props = {
  data: MetricData[];
};

const PieChart = ({ data }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const labels = data.map((item) => item.label);
  const dataMetrics = data.map((item) => item.data);

  const drawPieChart = async () => {
    await sleep(2000);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: '# of Votes',
            data: dataMetrics,
            borderWidth: 2,
          },
        ],
      },
    });
  };

  useEffect(() => {
    drawPieChart();
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-[300px]">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PieChart;
