import { type Meta, type StoryObj } from '@storybook/angular';
import { IconSelectComponent, IconType } from '@Components';

const meta: Meta<IconSelectComponent> = {
    component: IconSelectComponent,
    tags: ['autodocs'],
    args: {
        icon: {
            icon_type: IconType.ICON,
            icon: '',
            icon_background: '',
            icon_url: ''
        },
        filter_icon_type: IconType.ICON,
    }
};

export default meta;
type Story = StoryObj<IconSelectComponent>;


export const Icon: Story = {
    args: {
        icon: {
            icon_type: IconType.ICON,
            icon: '',
            icon_background: '',
            icon_url: ''
        },
        filter_icon_type: IconType.ICON,
    },
};
export const Image: Story = {
    args: {
        icon: {
            icon_type: IconType.IMAGE,
            icon: '/assets/assets.png',
            icon_background: '',
            icon_url: ''
        },
        filter_icon_type: IconType.IMAGE,
    },
};

