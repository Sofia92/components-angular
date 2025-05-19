import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  nonNegativeIntegerValidator,
  positiveIntegerValidator,
  decimalNumberValidator,
  onlyChineseValidator,
  phoneNumberValidator,
  landlineAndPhoneValidator,
  certificateCodeValidator,
  noEmptyValidator,
  checkListRequireValidator,
  MyValidators
} from '@Utils';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-validators-demo',
  template: `
    <div class="validators-demo">
      <h2>表单验证器演示</h2>
      
      <form class="form-group" [formGroup]="validateForm" (ngSubmit)="submitForm()">
        <div class="form-item">
          <label>非空验证：</label>
          <input formControlName="noEmpty" placeholder="输入内容不能为空">
          <div class="error" *ngIf="validateForm.get('noEmpty')?.errors?.['noEmpty']">
            输入内容不能为空
          </div>
        </div>

        <div class="form-item">
          <label>非负整数：</label>
          <input formControlName="nonNegativeInteger" placeholder="请输入非负整数">
          <div class="error" *ngIf="validateForm.get('nonNegativeInteger')?.errors?.['nonNegativeInteger']">
            请输入有效的非负整数
          </div>
        </div>

        <div class="form-item">
          <label>正整数：</label>
          <input formControlName="positiveInteger" placeholder="请输入正整数">
          <div class="error" *ngIf="validateForm.get('positiveInteger')?.errors?.['positiveInteger']">
            请输入有效的正整数
          </div>
        </div>

        <div class="form-item">
          <label>小数：</label>
          <input formControlName="decimalNumber" placeholder="请输入小数">
          <div class="error" *ngIf="validateForm.get('decimalNumber')?.errors?.['decimalNumber']">
            请输入有效的小数
          </div>
        </div>

        <div class="form-item">
          <label>中文：</label>
          <input formControlName="chinese" placeholder="请输入中文">
          <div class="error" *ngIf="validateForm.get('chinese')?.errors?.['onlyChinese']">
            请输入有效的中文
          </div>
        </div>

        <div class="form-item">
          <label>手机号：</label>
          <input formControlName="phone" placeholder="请输入手机号">
          <div class="error" *ngIf="validateForm.get('phone')?.errors?.['phoneNumber']">
            请输入有效的手机号
          </div>
        </div>

        <div class="form-item">
          <label>座机或手机：</label>
          <input formControlName="landlineAndPhone" placeholder="请输入座机或手机号">
          <div class="error" *ngIf="validateForm.get('landlineAndPhone')?.errors?.['landlineAndPhone']">
            请输入有效的座机或手机号
          </div>
        </div>

        <div class="form-item">
          <label>身份证号：</label>
          <input formControlName="certificateCode" placeholder="请输入身份证号">
          <div class="error" *ngIf="validateForm.get('certificateCode')?.errors?.['certificateCode']">
            请输入有效的身份证号
          </div>
        </div>

        <div class="form-item">
          <label>姓名：</label>
          <input formControlName="myName" placeholder="请输入姓名">
          <div class="error" *ngIf="validateForm.get('myName')?.errors?.['name']">
            {{ validateForm.get('myName')?.errors?.['name']?.['zh-cn'] }}
          </div>
        </div>

        <div class="form-item">
          <label>自定义手机号：</label>
          <input formControlName="mobile" placeholder="请输入手机号">
          <div class="error" *ngIf="validateForm.get('mobile')?.errors?.['phoneNumber']">
            {{ validateForm.get('mobile')?.errors?.['phoneNumber']?.['zh-cn'] }}
          </div>
        </div>

        <div class="form-item">
          <label>社会信用代码：</label>
          <input formControlName="socialUnifiedCode" placeholder="请输入社会信用代码">
          <div class="error" *ngIf="validateForm.get('socialUnifiedCode')?.errors?.['name']">
            {{ validateForm.get('socialUnifiedCode')?.errors?.['name']?.['zh-cn'] }}
          </div>
        </div>

        <div class="form-item">
          <label>最小长度(3)：</label>
          <input formControlName="minLength" placeholder="请输入至少3个字符">
          <div class="error" *ngIf="validateForm.get('minLength')?.errors?.['minlength']">
            {{ validateForm.get('minLength')?.errors?.['minlength']?.['zh-cn'] }}
          </div>
        </div>

        <div class="form-item">
          <label>最大长度(10)：</label>
          <input formControlName="maxLength" placeholder="请输入最多10个字符">
          <div class="error" *ngIf="validateForm.get('maxLength')?.errors?.['maxlength']">
            {{ validateForm.get('maxLength')?.errors?.['maxlength']?.['zh-cn'] }}
          </div>
        </div>

        <div class="form-item">
          <label>身份证号严格验证：</label>
          <input formControlName="idCardNo" placeholder="请输入身份证号">
          <div class="error" *ngIf="validateForm.get('idCardNo')?.errors?.['name']">
            {{ validateForm.get('idCardNo')?.errors?.['name']?.['zh-cn'] }}
          </div>
        </div>

      </form>
      <button nz-button nzType="primary" type="submit" [disabled]="!validateForm.valid">提交</button>
    </div>
  `,
  styles: [`
    .form-group{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      width: 80vw;
      gap: 12px;
    }
    .form-item {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
    .error {
      color: #ff4d4f;
      font-size: 12px;
      margin-top: 4px;
    }
  `],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzButtonModule]
})
export class ValidatorsDemoComponent {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      noEmpty: ['', [noEmptyValidator()]],
      nonNegativeInteger: ['', [nonNegativeIntegerValidator()]],
      positiveInteger: ['', [positiveIntegerValidator()]],
      decimalNumber: ['', [decimalNumberValidator()]],
      chinese: ['', [onlyChineseValidator()]],
      phone: ['', [phoneNumberValidator()]],
      landlineAndPhone: ['', [landlineAndPhoneValidator()]],
      certificateCode: ['', [certificateCodeValidator()]],
      myName: ['', [MyValidators.myName]],
      mobile: ['', [MyValidators.mobile]],
      socialUnifiedCode: ['', [MyValidators.socialUnifiedCode]],
      minLength: ['', [MyValidators.minLength(3)]],
      maxLength: ['', [MyValidators.maxLength(10)]],
      idCardNo: ['', [(control: AbstractControl) => MyValidators.validateIdCardNo(control.value)]]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('表单数据：', this.validateForm.value);
    }
  }
} 