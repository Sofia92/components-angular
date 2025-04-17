import { type Meta, type StoryObj } from '@storybook/angular';
import { SearchBoxComponent } from '@Components';


let keyword = '';
const meta: Meta<SearchBoxComponent> = {
    title: 'Components/search box',
    component: SearchBoxComponent,
    tags: ['autodocs'],
    args: {
        keyword: keyword
    }
};

export default meta;
type Story = StoryObj<SearchBoxComponent>;

export const base: Story = {
    args: {
        keyword: keyword
    },
};