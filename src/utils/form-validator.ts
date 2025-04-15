import { AbstractControl, FormControl, FormArray, FormGroup } from '@angular/forms';

/**
 * angular 表单校验
 * @param control 表单控件
 * @param options 额外的参数配置，具体可以查看 AbstractControl.updateValueAndValidity 的第二个参数
 */
export function validateForm(
  control: AbstractControl,
  options: { onlySelf?: boolean; emitEvent?: boolean; } = {}
): void {
  try {
    const fn = (c: AbstractControl, o: { onlySelf?: boolean; emitEvent?: boolean; } = {}) => {
      if (c instanceof FormControl) {
        c.markAsDirty();
        c.updateValueAndValidity(o);
        return;
      }
      if (c instanceof FormArray) {
        for (const ac of c.controls) {
          fn(ac, o);
        }
        return;
      }
      if (c instanceof FormGroup) {
        for (const key in c.controls) {
          if (c.controls.hasOwnProperty(key)) {
            fn(c.controls[key], o);
          }
        }
        return;
      }
    };
    fn(control, options);
  } catch (error) {
    window.console.error(error);
  }
}
