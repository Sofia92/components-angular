export enum EOperator {
    GreaterThan = 0,
    LessThan = 1,
    EqualTo = 2,
    NotEqualTo = 3,
    Between = 4,
    Contains = 5,
    NotContains = 6
}
export enum ECmpTypeOperatorMap {
    number = 1,
    char = 2,
    select_single = 3,
    select_multiple = 4,
    select_cascader = 5,
    date = 6,
}
export interface IOperator {
    value: EOperator;
    label: string;
    dataTypes: ECmpTypeOperatorMap[];
    isRange: boolean;
}
export const operators: IOperator[] = [
    {
        value: EOperator.GreaterThan, label: '大于', dataTypes: [ECmpTypeOperatorMap.number, ECmpTypeOperatorMap.date], isRange: false
    },
    {
        value: EOperator.LessThan, label: '小于', dataTypes: [ECmpTypeOperatorMap.number, ECmpTypeOperatorMap.date], isRange: false
    },
    {
        value: EOperator.EqualTo, label: '等于', dataTypes: [ECmpTypeOperatorMap.number, ECmpTypeOperatorMap.char, ECmpTypeOperatorMap.select_single, ECmpTypeOperatorMap.select_cascader], isRange: false
    },
    {
        value: EOperator.NotEqualTo, label: '不等于', dataTypes: [ECmpTypeOperatorMap.number, ECmpTypeOperatorMap.char, ECmpTypeOperatorMap.select_single, ECmpTypeOperatorMap.select_cascader], isRange: false
    },
    {
        value: EOperator.Between, label: '范围', dataTypes: [ECmpTypeOperatorMap.number, ECmpTypeOperatorMap.date], isRange: true
    }, {
        value: EOperator.Contains, label: '包含', dataTypes: [ECmpTypeOperatorMap.char, ECmpTypeOperatorMap.select_multiple], isRange: false
    },
    {
        value: EOperator.NotContains, label: '不包含', dataTypes: [ECmpTypeOperatorMap.char, ECmpTypeOperatorMap.select_multiple], isRange: false
    }
];

export interface ISelectOption {
    value: string;
    label: string;
    isLeaf?: boolean;
    children?: ISelectOption[];
}