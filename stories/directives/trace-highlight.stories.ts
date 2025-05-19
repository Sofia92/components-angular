import type { Meta, StoryObj } from '@storybook/angular';
import { TraceHighlightDemoComponent } from './trace-highlight.component';

const meta: Meta<TraceHighlightDemoComponent> = {
  title: 'Directives/TraceHighlight',
  component: TraceHighlightDemoComponent,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<TraceHighlightDemoComponent>;

/**
 * 文本高亮指令示例
 * - 支持关键词搜索和高亮
 * - 支持关键词+属性双重匹配
 * - 实时高亮显示匹配内容
 * - 支持多个匹配结果
 */
export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-trace-highlight-demo></app-trace-highlight-demo>
    `
  })
}; 