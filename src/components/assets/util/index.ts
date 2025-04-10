import { DirectionIconNames, SuggestionIconNames, EditionIconNames, CommonIconNames } from "./sourceIcons";
import { kebabCase } from 'lodash';

export function ngZorroIconCategoryNames() {
  return {
    '方向性图标': DirectionIconNames.map(name => kebabCase(name)),
    '提示建议性图标': SuggestionIconNames.map(name => kebabCase(name)),
    '编辑类图标': EditionIconNames.map(name => kebabCase(name)),
    '网站通用图标': CommonIconNames.map(name => kebabCase(name))
  };
}

export interface IAppIcon {
  icon_type: IconType,
  icon: string,
  icon_background: string,
  icon_url: string,
}

export enum IconType {
  IMAGE = 'image',
  EMOJI = 'emoji',
  ICON = 'icon'
}