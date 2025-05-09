import type { Meta, StoryObj } from '@storybook/angular';
import { BallParabolaDirective } from '../../src/directives/ball-parabola.directive';

/**
 * BallParabolaDirective 的 Storybook 配置
 * 该指令用于创建点击元素到目标元素的抛物线动画效果
 */
const meta: Meta<BallParabolaDirective> = {
  title: 'Directives/BallParabola',
  component: BallParabolaDirective,
  tags: ['autodocs'],
  argTypes: {
    isAnimationEnabled: {
      control: 'boolean',
      description: '控制抛物线动画是否启用',
      defaultValue: true,
    },
    targetDomId: {
      control: 'text',
      description: '目标元素的 DOM ID',
      defaultValue: 'target',
    },
    finishParabola: {
      action: 'finishParabola',
      description: '抛物线动画完成时触发的事件',
    },
  },
};

export default meta;
type Story = StoryObj<BallParabolaDirective>;

/**
 * 基础示例：展示抛物线动画的基本用法
 * - 点击按钮触发动画
 * - 小球从按钮位置移动到目标位置
 */
export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="demo-container">
        <!-- 目标元素 -->
        <div 
          id="target"
          class="target-box">
        </div>
        <!-- 触发按钮 -->
        <button 
          appBallParabola
          [isAnimationEnabled]="isAnimationEnabled"
          targetDomId="target"
          (finishParabola)="finishParabola($event)"
          class="trigger-button">
          Click Me
        </button>
      </div>
    `,
    styles: [`
      .demo-container {
        display: flex;
        gap: 20px;
        padding: 20px;
      }
      .target-box {
        width: 50px;
        height: 50px;
        background: #2196F3;
        border-radius: 4px;
      }
      .trigger-button {
        padding: 10px 20px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .trigger-button:hover {
        background: #45a049;
      }
    `],
  }),
  args: {
    isAnimationEnabled: true,
    targetDomId: 'target',
  },
};

/**
 * 禁用状态示例：展示当 isAnimationEnabled 为 false 时的行为
 * - 点击按钮不会触发动画
 */
export const Disabled: Story = {
  ...Basic,
  args: {
    isAnimationEnabled: false,
    targetDomId: 'target',
  },
};
