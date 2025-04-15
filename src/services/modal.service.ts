import { Injectable, TemplateRef } from "@angular/core";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzI18nService } from "ng-zorro-antd/i18n";
import { NzSafeAny } from "ng-zorro-antd/core/types";
@Injectable({ providedIn: 'root' })
export class MyModalService {
  constructor(private _nzModal: NzModalService, private _nzI18nService: NzI18nService) { }

  public create(tplTitle: string, tplContent: string | TemplateRef<NzSafeAny>, nzComponentParams = {}, functions: any[], modalOptions?: any) {
    const [disabledSubmit, submitCallback] = functions;
    const _modal = this._nzModal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzMaskClosable: false,
      nzClosable: false,
      nzAutofocus: false,
      ...modalOptions,
      nzComponentParams: nzComponentParams,
      nzFooter: !!modalOptions && 'nzFooter' in modalOptions
        ? modalOptions.nzFooter
        : [
          {
            label: this._nzI18nService.translate('Modal.cancelText'),
            onClick: () => {
              _modal.destroy(false);
            }
          },
          {
            label: this._nzI18nService.translate('Modal.okText'),
            type: 'primary',
            disabled: disabledSubmit ? disabledSubmit : false,
            onClick: async () => {
              if (submitCallback) {
                _modal.updateConfig({ nzOkLoading: true });
                const res = await submitCallback();
                if (!!res) {
                  _modal.updateConfig({ nzOkLoading: false });
                  _modal.destroy(true);
                }
              } else {
                _modal.destroy(true);
              }
            }
          }
        ]
    });
    return _modal;
  }

  public confirm(nzTitle: string, nzContent: string | TemplateRef<NzSafeAny>) {
    return new Promise((resolve) => {
      return this._nzModal.confirm({
        nzTitle, nzContent,
        nzOkDanger: true,
        nzOnCancel: () => resolve(false),
        nzOnOk: () => resolve(true)
      })
    })
  }
}