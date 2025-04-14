import { type Meta, type StoryObj } from '@storybook/angular';
import { SearchTagComponent } from '@Components/search-tag';



const meta: Meta<SearchTagComponent> = {
    title: 'Example/search tag',
    component: SearchTagComponent,
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<SearchTagComponent>;
export const base: Story = {
    args: {
        tagList: [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }],
        width: 150,
        tagIds: ['1', '2']
    },
};
