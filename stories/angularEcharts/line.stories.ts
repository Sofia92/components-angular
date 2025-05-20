import type { Meta, StoryObj } from '@storybook/angular';

import { ChartType, LineChartComponent } from '@AngularEcharts';

const meta: Meta<LineChartComponent> = {
  title: 'AngularEcharts/Line',
  component: LineChartComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<LineChartComponent>;

export const Primary: Story = {
  args: {
    chartData: {
      "label": "分组分布",
      "type": ChartType.LINE,  //图表类型 bar 和pie 两种
      "data": [
        { label: "分组1", value: 10, unit: "人" },
        { label: "分组2", value: 30, unit: "人" },
        { label: "分组3", value: 10, unit: "人" },
      ]
    }
  },
};
