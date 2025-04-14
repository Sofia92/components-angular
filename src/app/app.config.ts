import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

/** 配置 Angular  国际化 **/
import en from '@angular/common/locales/zh';
registerLocaleData(en);

/** 配置 ng-zorro-antd 国际化 **/
import { provideNzI18n } from 'ng-zorro-antd/i18n';
import { en_US } from '../components/i18n';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(), //added the function here
    provideNzI18n(en_US)
  ]
};
