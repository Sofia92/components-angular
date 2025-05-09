import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { WaterMarkDirective } from '@Directives';

const meta: Meta<WaterMarkDirective> = {
  title: 'Directives/WaterMarkDirective',
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 800px; height: 400px; border: 1px solid #ccc; position: relative;" appWaterMark [name]="name" [isDisplay]="isDisplay">
        <div style="padding: 20px;">
          <h2>Content Area</h2>
          <p>This is a sample content area where the watermark will be displayed.</p>
        </div>
      </div>
    `,
  }),
  decorators: [
    moduleMetadata({
      imports: [WaterMarkDirective],
    }),
  ]
};

export default meta;

type Story = StoryObj<WaterMarkDirective>;

export const Default: Story = {
  args: {
    name: '里斯',
    isDisplay: true,
  },
};

export const Hidden: Story = {
  args: {
    name: '里斯',
    isDisplay: false,
  },
};

export const CustomText: Story = {
  args: {
    name: "请问的权威",
    isDisplay: true,
  },
};

