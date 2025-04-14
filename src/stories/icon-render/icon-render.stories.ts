import { type Meta, type StoryObj } from '@storybook/angular';
import { IconRenderComponent, IconType } from '../../components';

const meta: Meta<IconRenderComponent> = {
    title: 'Example/Icon-render',
    component: IconRenderComponent,
    tags: ['autodocs'],
    args: {
        icon_type: IconType.ICON,
        icon: '',
        icon_background: '',
        icon_url: ''
    }
};

export default meta;
type Story = StoryObj<IconRenderComponent>;


export const Icon: Story = {
    args: {
        icon_type: IconType.ICON,
        icon: "robot",
        icon_background: '',
        icon_url: ''
    },
};
export const Image: Story = {
    args: {
        icon_type: IconType.IMAGE,
        icon: "",
        icon_background: '',
        icon_url: "/assets/assets.png"
    },
};

