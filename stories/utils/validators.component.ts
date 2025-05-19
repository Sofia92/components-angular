import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import {
  noEmptyValidator,
  checkListRequireValidator,
  onlyNumberValidator,
  onlyChineseValidator,
  phoneNumberValidator,
  landlineAndPhoneValidator,
  certificateCodeValidator,
  MyValidators
} from '../../src/utils/validators';

@Component({
  selector: 'app-validators-demo',
  template: `
    <div class="validators-container">
      <div class="validator-section" *ngFor="let section of validatorSections">
        <h3>{{ section.title }}</h3>
        <div class="validator-demo">
          <form [formGroup]="section.form">
            <div class="form-item">
              <label>{{ section.label }}</label>
              <input 
                [type]="section.inputType || 'text'"
                [formControlName]="section.controlName"
                [placeholder]="section.placeholder"
                class="demo-input"
              >
              <div class="error-message" *ngIf="section.form.get(section.controlName)?.errors">
                {{ getErrorMessage(section.form.get(section.controlName)?.errors) }}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .validators-container {
      width: calc(100vw - 2rem);
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      gap: 12px;
    }
    .validator-section {
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }
    h3 {
      margin: 0 0 16px 0;
      color: #1976D2;
    }
    .validator-demo {
      margin-top: 16px;
    }
    .form-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    label {
      font-weight: 500;
      color: #333;
    }
    .demo-input {
      padding: 8px 12px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      font-size: 14px;
      transition: all 0.3s;
    }
    .demo-input:focus {
      border-color: #40a9ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      outline: none;
    }
    .error-message {
      color: #ff4d4f;
      font-size: 12px;
      margin-top: 4px;
    }
  `],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class ValidatorsDemoComponent implements OnInit {
  validatorSections: any[] = [];
  private fb = new FormBuilder();

  ngOnInit() {
    this.validatorSections = [
      {
        title: '非空验证',
        label: '输入内容不能为空（包括空白字符）',
        controlName: 'noEmpty',
        form: this.fb.group({
          noEmpty: ['', noEmptyValidator()]
        }),
        placeholder: '请输入内容'
      },
      {
        title: '数字验证',
        label: '只能输入数字',
        controlName: 'onlyNumber',
        form: this.fb.group({
          onlyNumber: ['', onlyNumberValidator()]
        }),
        placeholder: '请输入数字'
      },
      {
        title: '中文验证',
        label: '只能输入中文和字母',
        controlName: 'onlyChinese',
        form: this.fb.group({
          onlyChinese: ['', onlyChineseValidator()]
        }),
        placeholder: '请输入中文或字母'
      },
      {
        title: '手机号验证',
        label: '请输入手机号',
        controlName: 'phoneNumber',
        form: this.fb.group({
          phoneNumber: ['', phoneNumberValidator()]
        }),
        placeholder: '请输入手机号'
      },
      {
        title: '座机和手机号验证',
        label: '请输入座机或手机号',
        controlName: 'landlineAndPhone',
        form: this.fb.group({
          landlineAndPhone: ['', landlineAndPhoneValidator()]
        }),
        placeholder: '请输入座机或手机号'
      },
      {
        title: '身份证号验证',
        label: '请输入身份证号',
        controlName: 'certificateCode',
        form: this.fb.group({
          certificateCode: ['', certificateCodeValidator()]
        }),
        placeholder: '请输入身份证号'
      },
      {
        title: '自定义姓名验证',
        label: '请输入姓名',
        controlName: 'myName',
        form: this.fb.group({
          myName: ['', MyValidators.myName]
        }),
        placeholder: '请输入姓名'
      },
      {
        title: '自定义手机号验证',
        label: '请输入手机号',
        controlName: 'mobile',
        form: this.fb.group({
          mobile: ['', MyValidators.mobile]
        }),
        placeholder: '请输入手机号'
      },
      {
        title: '社会信用代码验证',
        label: '请输入社会信用代码',
        controlName: 'socialUnifiedCode',
        form: this.fb.group({
          socialUnifiedCode: ['', MyValidators.socialUnifiedCode]
        }),
        placeholder: '请输入社会信用代码'
      },
      {
        title: '最小长度验证',
        label: '最小长度为 3',
        controlName: 'minLength',
        form: this.fb.group({
          minLength: ['', MyValidators.minLength(3)]
        }),
        placeholder: '请输入至少3个字符'
      },
      {
        title: '最大长度验证',
        label: '最大长度为 10',
        controlName: 'maxLength',
        form: this.fb.group({
          maxLength: ['', MyValidators.maxLength(10)]
        }),
        placeholder: '请输入最多10个字符'
      },
      {
        title: '身份证号严格验证',
        label: '请输入身份证号（包含校验位验证）',
        controlName: 'idCardNo',
        form: this.fb.group({
          idCardNo: ['', (control: AbstractControl) => MyValidators.validateIdCardNo(control.value)]
        }),
        placeholder: '请输入身份证号'
      }
    ];
  }

  getErrorMessage(errors: any): string {
    if (!errors) return '';

    const errorMessages: { [key: string]: string } = {
      'noEmpty': '输入内容不能为空',
      'onlyNumber': '只能输入数字',
      'onlyChinese': '只能输入中文和字母',
      'phoneNumber': errors.phoneNumber?.['zh-cn'] || '请输入正确的手机号',
      'landlineAndPhone': '请输入正确的座机或手机号',
      'certificateCode': '请输入正确的身份证号',
      'name': errors.name?.['zh-cn'] || '验证失败',
      'minlength': errors.minlength?.['zh-cn'] || '长度不足',
      'maxlength': errors.maxlength?.['zh-cn'] || '超出长度限制'
    };

    for (const key in errors) {
      if (errorMessages[key]) {
        return errorMessages[key];
      }
    }
    return '验证失败';
  }
} 