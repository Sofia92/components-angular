import { type Meta, type StoryObj } from '@storybook/angular';
import { SearchTagComponent } from '@Components';

const meta: Meta<SearchTagComponent> = {
    title: 'Components/search tag',
    component: SearchTagComponent,
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<SearchTagComponent>;
export const base: Story = {
    args: {
        tagList: [{ id: 1, name: 'tag1' }, { id: 2, name: '超超超超超超超超超超超茶匙擦和春华草吵吵吵吵' }, { id: 3, name: 'tag3' }],
        width: 150,
        tagIds: ['1', '2']
    },
};
