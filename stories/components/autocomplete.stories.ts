import { moduleMetadata, Meta, StoryFn } from '@storybook/angular';
import { LibAutocompleteComponent } from '@Components';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export default {
  title: 'Components/Autocomplete',
  component: LibAutocompleteComponent,
  argTypes: {
    placeholder: { control: 'text' },
    loading: { control: 'boolean' },
    isCustom: { control: 'boolean' },
    suggestions: { control: 'object' },
    subSuggestions: { control: 'object' },
    tips: { control: 'object' },
    selectedValue: { control: 'text' },
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule],
    }),
  ],
} as Meta<LibAutocompleteComponent>;

const Template: StoryFn<LibAutocompleteComponent> = (args) => ({
  component: LibAutocompleteComponent,
  props: args,
  template: `
    <div style="width: 300px; margin: 20px;">
      <input LibAutocomplete
        [placeholder]="placeholder"
        [loading]="loading"
        [isCustom]="isCustom"
        [suggestions]="suggestions"
        [subSuggestions]="subSuggestions"
        [tips]="tips"
        [selectedValue]="selectedValue"
        (changeEmitter)="onChange($event)"
        (changeClickEmitter)="onClick($event)"
      />
    </div>
  `,
});

export const Basic = Template.bind({});
Basic.args = {
  placeholder: '请输入搜索内容',
  loading: false,
  isCustom: false,
  suggestions: ['选项1', '选项2', '选项3'],
  subSuggestions: [],
  tips: [],
  selectedValue: '',
};

export const WithSubSuggestions = Template.bind({});
WithSubSuggestions.args = {
  placeholder: '请输入搜索内容',
  loading: false,
  isCustom: false,
  suggestions: ['北京', '上海', '广州'],
  subSuggestions: ['Beijing', 'Shanghai', 'Guangzhou'],
  tips: ['首都', '经济中心', '南方城市'],
  selectedValue: '',
};

export const CustomMode = Template.bind({});
CustomMode.args = {
  placeholder: '请输入搜索内容',
  loading: false,
  isCustom: true,
  suggestions: ['ID1', 'ID2', 'ID3'],
  subSuggestions: ['自定义内容1', '自定义内容2', '自定义内容3'],
  tips: ['提示1', '提示2', '提示3'],
  selectedValue: '',
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  placeholder: '请输入搜索内容',
  loading: true,
  isCustom: false,
  suggestions: [],
  subSuggestions: [],
  tips: [],
  selectedValue: '',
}; 