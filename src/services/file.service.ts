import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import html2canvas from "html2canvas";
import { catchError, map, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FileService {
    constructor(private http: HttpClient) { }

    public get signatureToken(): string | null {
        return localStorage.getItem('signatureToken');
    }

    public downloadFile(url: string, fileName: string = 'export'): void {
        let alink;
        alink = document.createElement('a');
        alink.setAttribute('href', url);
        alink.setAttribute('download', fileName);
        alink.style.visibility = 'hidden';
        document.body.appendChild(alink);
        alink.click();
        document.body.removeChild(alink);
    }

    public downloadFileWithBlob(url: string, fileName: string): Promise<any> {
        const headers = this.prepareHeaders();
        return new Promise((resolve, reject) => {
            this.http.post(url, {}, { headers, responseType: 'blob' })
                .pipe(
                    map(res => {
                        const path = URL.createObjectURL(res);
                        let link = document.createElement('a');

                        link.style.display = 'none';
                        link.href = path;
                        link.download = fileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        // link = null;
                        URL.revokeObjectURL(path);
                        resolve(true)
                    }),
                    catchError((err) => {
                        reject(err);
                        return of(err);
                    })
                )
        })
    }

    downloadDom(dom: HTMLElement, fileName: string,) {
        return html2canvas(dom).then((canvas: any) => {
            canvas.toBlob((blob: string) => {
                const href = window.URL.createObjectURL(new Blob([blob]))
                const link = document.createElement('a')
                link.href = href;
                link.download = `${fileName}.png`;
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }, 'image/png')
        })
    }

    // 处理文件类型
    public setFilesType(filesList: { sourceName: string, fileType: string }[]): { sourceName: string, fileType: string }[] {
        const regPic = /\.(?:jpeg|png|gif|jpg)/i;
        const regDoc = /\.(?:doc|docx)/i;
        const regXls = /\.(?:xls|xlsx)/i;
        const newFileLists = filesList.map((item) => {
            if (regPic.test(item.sourceName)) {
                item.fileType = 'img';
            } else if (regDoc.test(item.sourceName)) {
                item.fileType = 'doc';
            } else if (regXls.test(item.sourceName)) {
                item.fileType = 'xls';
            }
            return item;
        });
        return newFileLists;
    }

    private prepareHeaders(): HttpHeaders {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        if (this.signatureToken) {
            const authorization = `Bearer ${this.signatureToken}`;
            headers.set('Authorization', authorization);
        }
        return headers;
    }
}