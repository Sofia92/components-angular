import { NzMessageService } from "ng-zorro-antd/message";
import { last } from 'lodash';

export function chooseFileToUpload(
  fileType: string[],
  createDataFromFile: (file: File) => void,
  _message: NzMessageService,
  accept?: string[],
  size?: number): void {
  const finput = document.createElement('input');
  finput.type = 'file';
  if (accept) {
    finput.accept = accept.join(',');
  }
  finput.style.display = 'none';
  document.body.appendChild(finput);
  finput.onchange = () => {
    setTimeout(
      async () => {
        let file = last(finput.files);
        if (!file) {
          _message.error('空文件!');
          return false;
        }
        const uploadFileType = fileType;
        const extName = file.name.substring(file.name.lastIndexOf('.'))
          .toLowerCase();
        if (file.name.lastIndexOf('.') === -1) {
          _message.error('路径不正确!');
          return false;
        } else if (uploadFileType.indexOf(`${extName}`) === -1) {
          const errMsg = `当前上传文件类型为${extName},目前暂不支持。请上传 ${uploadFileType.join(',')}类型的文件`;
          _message.error(errMsg, { nzDuration: 3000 });
          // file = null;
          return false;
        } else if (size && (file.size > 1024 * 1024 * size)) {
          _message.error(`图标大小不能超过${size}M!`);
          return false;
        } else {
          createDataFromFile(file);
          document.body.removeChild(finput);
          return true;
        }
        document.body.removeChild(finput);
      }, 300);
  };
  finput.click();
}