import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ECmpTypeOperatorMap, EOperator, IOperator, ISelectOption } from "@Utils";
import { NzCascaderModule } from "ng-zorro-antd/cascader";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzSelectModule } from "ng-zorro-antd/select";

@Component({
  selector: 'form-operator-compact',
  templateUrl: './form-operator-compact.html',
  styles: [`
  .values {
    display: flex;
  }
  `],
  host: { class: 'full-width' },
  imports: [CommonModule, FormsModule, NzInputModule, NzInputNumberModule, NzSelectModule, NzDatePickerModule, NzCascaderModule]
})
export class FormOperatorCompactComponent implements OnChanges {
  @Input() public dataType: ECmpTypeOperatorMap;
  @Input() public operators: IOperator[];
  @Input() public operator: EOperator;
  @Output() public operatorChange = new EventEmitter<EOperator>();
  @Input() public values = new Array(2);
  @Input() public min?: number = undefined;
  @Input() public extraOptions: ISelectOption[] = [];
  @Input() public isReadonly = false;
  @Output() public valuesChange = new EventEmitter<any[]>();

  public EOperator = EOperator;
  public ECmpTypeOperatorMap = ECmpTypeOperatorMap;

  constructor() { }

  public get isRange(): boolean {
    const currentOperator = this.operators.find(o => o.value === this.operator);
    return currentOperator && currentOperator.isRange || false;
  }

  public ngOnChanges(changes: SimpleChanges) {
    const { dataType } = changes;
    if (dataType && !!dataType.previousValue) {
      this.values = new Array(2);
    }
  }

  public setOperator(operator: any) {
    this.values = new Array(2);
    this.operator = operator;
    this.operatorChange.emit(operator);
  }

  public updateValue(value: any, isEndValue: boolean) {
    isEndValue
      ? this.values[1] = value
      : this.values[0] = value;
    this.valuesChange.emit(this.values)
  }

  public updateDateRangeValue() {
    this.valuesChange.emit(this.values)
  }

  public getDisplayValue(isEndValue: boolean): any {
    if (isEndValue) {
      return this.values[1]
    }

    if (this.dataType === ECmpTypeOperatorMap.date) {
      if (Array.isArray(this.values[0])) {
        if (this.isRange) {
          return this.values;
        }
        return this.values[0][0]
      }
    }
    return this.values[0];
  }
}

