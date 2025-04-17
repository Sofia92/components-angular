import { type Meta, type StoryObj } from '@storybook/angular';

import { withActions } from '@storybook/addon-actions/decorator';
import { FormOperatorCompactComponent } from '@Components';
import { ECmpTypeOperatorMap, operators } from '@Utils';

const charOperators = (dataType: ECmpTypeOperatorMap) => operators.filter(o => o.dataTypes.includes(dataType));

const meta: Meta<FormOperatorCompactComponent> = {
    component: FormOperatorCompactComponent,
    // tags: ['autodocs'],
    args: {
        dataType: ECmpTypeOperatorMap.char,
        operators: charOperators(ECmpTypeOperatorMap.char),
        operator: charOperators(ECmpTypeOperatorMap.char)[0].value,
        values: [],
    },
    decorators: [withActions],
};

export default meta;
type Story = StoryObj<FormOperatorCompactComponent>;


export const Text: Story = {
    args: {
        dataType: ECmpTypeOperatorMap.char,
        operators: charOperators(ECmpTypeOperatorMap.char),
        operator: charOperators(ECmpTypeOperatorMap.char)[0].value,
        values: [],
    },
};
export const Number: Story = {
    args: {
        dataType: ECmpTypeOperatorMap.number,
        operators: charOperators(ECmpTypeOperatorMap.number),
        operator: charOperators(ECmpTypeOperatorMap.number)[0].value,
        values: [],
    },
};
export const SelectSingle: Story = {
    args: {
        dataType: ECmpTypeOperatorMap.select_single,
        operators: charOperators(ECmpTypeOperatorMap.select_single),
        operator: charOperators(ECmpTypeOperatorMap.select_single)[0].value,
        values: [],
        extraOptions: [
            { value: 'ningbo', label: 'Ningbo' },
            { value: 'hangzhou', label: 'Hangzhou' },
            { value: 'xihu', label: 'West Lake' },
        ]
    },
};
export const SelectMultiple: Story = {
    args: {
        dataType: ECmpTypeOperatorMap.select_multiple,
        operators: charOperators(ECmpTypeOperatorMap.select_multiple),
        operator: charOperators(ECmpTypeOperatorMap.select_multiple)[0].value,
        values: [],
        extraOptions: [
            { value: 'ningbo', label: 'Ningbo' },
            { value: 'hangzhou', label: 'Hangzhou' },
            { value: 'xihu', label: 'West Lake' },
        ]
    },
};
export const Date: Story = {
    args: {
        dataType: ECmpTypeOperatorMap.date,
        operators: charOperators(ECmpTypeOperatorMap.date),
        operator: charOperators(ECmpTypeOperatorMap.date)[0].value,
        values: [],
    },
};
export const Cascader: Story = {
    args: {
        dataType: ECmpTypeOperatorMap.select_cascader,
        operators: charOperators(ECmpTypeOperatorMap.select_cascader),
        operator: charOperators(ECmpTypeOperatorMap.select_cascader)[0].value,
        values: [],
        extraOptions: [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                    {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                        children: [
                            {
                                value: 'xihu',
                                label: 'West Lake',
                                isLeaf: true
                            }
                        ]
                    },
                    {
                        value: 'ningbo',
                        label: 'Ningbo',
                        isLeaf: true
                    }
                ]
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                    {
                        value: 'nanjing',
                        label: 'Nanjing',
                        children: [
                            {
                                value: 'zhonghuamen',
                                label: 'Zhong Hua Men',
                                isLeaf: true
                            }
                        ]
                    }
                ]
            }
        ]
    },
};