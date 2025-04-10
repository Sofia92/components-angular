import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { IconSelectComponent, IconType } from '../../components';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<IconSelectComponent> = {
    title: 'Example/Icon-select',
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
    },
    decorators: [
        applicationConfig({
            providers: [provideHttpClient()],
        }),
    ],
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

