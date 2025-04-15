
import { ModelType } from '@Base/models/model';

export function getModelTypeStyle(modelType: string) {
  let style = { background: '', color: '' };

  switch (modelType) {
    case ModelType.LanguageModels:
      style = {
        'background': '#DCDCF4',
        'color': '#6366F1'
      };
      break;
    case ModelType.EmbeddingModels:
      style = {
        'background': '#F3E8FF',
        'color': '#9333EA'
      };
      break;
    case ModelType.RerankModels:
      style = {
        'background': '#FFEDD5',
        'color': '#EA580C'
      };
      break;
    case ModelType.ImageModels:
      style = {
        'background': '#E3DFE8',
        'color': '#8138D8'
      };
      break;
    case ModelType.AudioModels:
      style = {
        'background': '#F8E3FC',
        'color': '#E056FD'
      };
      break;
    case ModelType.VideoModels:
      style = {
        'background': '#EAFFF1',
        'color': '#4ADE80'
      };
      break;
    case ModelType.SynyiModels:
    case ModelType.Custom:
      style = {
        'background': '#DBEAFE',
        'color': '#2563EB'
      };
      break;
    default:
      break;
  }
  return style;
}