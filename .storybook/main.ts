import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/angular",
    "options": {}
  },
  staticDirs: [
    { from: '../public/', to: '/assets/' },
    { from: '../node_modules/@ant-design/icons-angular/src/inline-svg/', to: '/assets/' }
  ]
};
export default config;