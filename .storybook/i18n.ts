import { inject, signal } from "@angular/core";
import { en_US, NzI18nService } from "ng-zorro-antd/i18n";


export class LanguageComponent {

  constructor(private i18n: NzI18nService) { }

  switchLanguage(locale: any) {
    this.i18n.setLocale(locale);
  }
}