import { NzMessageService } from "ng-zorro-antd/message";
import { last } from 'lodash';
import { HttpHeaders } from "@angular/common/http";

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
      }, 300);
  };
  finput.click();
}

/**
 * 获取下载文件名
 * @param headers 
 * @returns 
 */
export function getDownloadFileName(headers: HttpHeaders): string {
  let fileName = headers.get('Content-Disposition')
    ?.split(';')[1]
    ?.split('filename=')[1];
  const fileNameUnicode = headers.get('Content-Disposition')
    ?.split('filename*=')[1];
  if (fileNameUnicode) {
    fileName = decodeURIComponent(fileNameUnicode.split('\'\'')[1]);
  }
  return fileName || '';
}

/**
 * 复制到剪贴板
 * @param elem 
 * @returns 
 */
export function copyToClipboard(elem: HTMLElement): boolean {
  let target;
  const targetId = `_hiddenCopyText_`;

  target = document.getElementById(targetId);
  if (!target) {
    target = document.createElement('textarea');
    target.style.position = 'absolute';
    target.style.left = '-9999px';
    target.style.top = '0';
    target.id = targetId;
    document.body.appendChild(target);
  }
  target.textContent = elem.textContent;

  const currentFocus = document.activeElement;
  target.focus();
  (target as any).setSelectionRange(0, (target as any).value.length);

  // copy the selection
  let succeed;
  try {
    succeed = document.execCommand(`copy`);
  } catch (e) {
    succeed = false;
  }
  target.textContent = ``;
  return succeed;
}

/**
 * 打印到剪贴板
 * @param codes 
 */
export function printToClipboard(codes: any[]): void {
  const newWindow = window.open(`打印窗口`, `_blank`);
  if (!newWindow) return;

  const docCodes = (codes || []).map((code) => `<p>${code}</p>`)
    .join(' ');
  newWindow.document.write(docCodes);
  newWindow.document.close();
  newWindow.print();
  newWindow.close();
}
