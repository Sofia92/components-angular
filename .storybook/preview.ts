import { applicationConfig, componentWrapperDecorator, type Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNzI18n, NzI18nService } from 'ng-zorro-antd/i18n';
import { en_US, zh_CN } from '../src/components/i18n';
import { LanguageComponent } from './i18n';

setCompodocJson(docJson);

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en_US', right: '🇺🇸', title: 'English' },
          { value: 'zh_CN', right: '🇨🇳', title: '中文' },
        ],
        showName: true,
      },
    },
  },
  initialGlobals: {
    locale: 'en_US',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        provideHttpClient(), //added the function here
        provideNzI18n(en_US)
      ],
    }),

  ],
};

export default preview;

