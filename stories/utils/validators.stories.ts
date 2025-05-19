import type { Meta, StoryObj } from '@storybook/angular';
import { ValidatorsDemoComponent } from './validators.component';

const meta: Meta<ValidatorsDemoComponent> = {
  title: 'Utils/Validators',
  component: ValidatorsDemoComponent,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<ValidatorsDemoComponent>;

/**
 * 验证器示例：展示所有可用的表单验证器
 * - 包含多种验证类型：非空、数字、中文、手机号等
 * - 实时显示验证错误信息
 * - 支持自定义验证规则
 */
export const AllValidators: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-validators-demo></app-validators-demo>
    `
  })
}; 