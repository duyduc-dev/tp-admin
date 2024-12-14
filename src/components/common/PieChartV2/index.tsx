import { type PieTooltipProps, ResponsivePie } from '@nivo/pie';
import { FunctionComponent } from 'react';

interface PieData {
  id: string;
  label: string;
  value: number;
  color: string;
}

type Props = {
  margin?: { top: number; right: number; bottom: number; left: number };
  innerRadius?: number;
  isInteractive?: boolean;
  tooltip?: FunctionComponent<PieTooltipProps<PieData>>;
  data: PieData[];
  padAngle?: number;
};
const PieChartV2 = ({
  data,
  margin = { top: 2, bottom: 2, right: 2, left: 2 },
  isInteractive,
  innerRadius = 0.5,
  tooltip,
  padAngle,
}: Props) => (
  <ResponsivePie
    data={data}
    margin={margin}
    innerRadius={innerRadius}
    activeOuterRadiusOffset={2}
    colors={{ datum: 'data.color' }}
    padAngle={padAngle}
    enableArcLinkLabels={false}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={0}
    arcLinkLabelsColor={{ from: 'color' }}
    enableArcLabels={false}
    arcLabelsRadiusOffset={0}
    arcLabelsTextColor={{
      from: 'color',
      modifiers: [['darker', 2]],
    }}
    defs={[]}
    legends={[]}
    isInteractive={isInteractive}
    tooltip={tooltip}
  />
);

export default PieChartV2;
