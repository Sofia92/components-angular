import { Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NzSafeAny } from "ng-zorro-antd/core/types";

export const REGEXP = {
  phoneNumber: /^1[3-9]\d{9}$/,
  landlineAndPhone: /^((0\d{2,3}-\d{7,8})|(1[3-9]\d{9}))$/,
  onlyNumber: /^\d+$/,
  empty: /^\s+$/,
  onlyChinese: /^[\u4e00-\u9fa5_a-zA-Z]+$/,
  certificateCode: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,
};

export interface ISelectorOption<T = number, U = unknown> {
  label: string;
  value: T;
  extra?: U;
  checked?: boolean;
  disabled?: boolean;
}

/**
 * 输入框不能为空（包括空白字符）
 */
export function noEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const errorTip = { 'noEmpty': { value } };

    return !value || REGEXP.empty.test(value) ? errorTip : null;
  };
}

export function checkListRequireValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as ISelectorOption[] || [];
    const errorTip = { 'requireChecked': { value } };

    return value && value.some((item) => item.checked) ? null : errorTip;
  };
}

export function onlyNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const errorTip = { 'onlyNumber': { value } };

    return value && REGEXP.onlyNumber.test(value) ? null : errorTip;
  };
}

export function onlyChineseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const errorTip = { 'onlyChinese': { value } };
    return value && !REGEXP.onlyChinese.test(value) ? errorTip : null;
  };
}

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const errorTip = { 'phoneNumber': { value } };

    return value && !REGEXP.phoneNumber.test(value) ? errorTip : null;
  };
}

export function landlineAndPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const errorTip = { 'landlineAndPhone': { value } };
    return value && !REGEXP.landlineAndPhone.test(value) ? errorTip : null;
  };
}


export function certificateCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const errorTip = { 'certificateCode': { value } };
    return value && !REGEXP.certificateCode.test(value) ? errorTip : null;
  };
}


// 自定义表单校验
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<
  string,
  NzSafeAny
>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;


export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return {
        minlength: {
          'zh-cn': `最小长度为 ${minLength}`,
          en: `MinLength is ${minLength}`,
        },
      };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {
        maxlength: {
          'zh-cn': `最大长度为 ${maxLength}`,
          en: `MaxLength is ${maxLength}`,
        },
      };
    };
  }
  static myName(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;
    if (/^[ ]*$/g.test(value)) {
      return {
        name: { 'zh-cn': `姓名不可为空`, en: `usernName Cannot be empty` },
      };
    } else {
      return null;
    }
  }
  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value)
      ? null
      : {
        phoneNumber: {
          'zh-cn': `手机号码格式不正确`,
          en: `Mobile phone number is not valid`,
        },
      };
  }
  static socialUnifiedCode(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;
    if (!/^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/.test(value)) {
      return {
        name: { 'zh-cn': `社会信用代码格式错误`, en: `invalid socialUnifiedCode` },
      };
    } else {
      return null;
    }
  }

  // 检验身份证
  static validateIdCardNo(idCard: string): MyValidationErrors | null {
    let isValidCard: boolean = false;
    // 15位和18位身份证号码的正则表达式
    const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    // 如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
      if (idCard.length === 18) {
        // 将前17位加权因子保存在数组里
        const idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
        const idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
        // 用来保存前17位各自乖以加权因子后的总和
        let idCardWiSum = 0;

        for (let i = 0; i < 17; i++) {
          idCardWiSum += +(idCard.substring(i, i + 1)) * idCardWi[i];
        }

        // 计算出校验码所在数组的位置
        const idCardMod = idCardWiSum % 11;
        // 得到最后一位身份证号码
        const idCardLast = idCard.substring(17);
        // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
        if (+idCardMod === 2) {
          if (idCardLast === 'X' || idCardLast === 'x') {
            // alert("恭喜通过验证啦！");
            isValidCard = true;
          }
        } else {
          // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
          if (+idCardLast === idCardY[idCardMod]) {
            // alert("恭喜通过验证啦！");
            isValidCard = true;
          }
        }
      }
    }

    return isValidCard ? null : {
      name: { 'zh-cn': `您输入的身份证号格式有误`, en: `invalid idCardNo` },
    };;
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(value);
}