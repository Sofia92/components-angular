import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import html2canvas from "html2canvas";
import JSPDF from "jspdf";
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

    exportPDF(element: any) {
        return html2canvas(element, { scale: 1, logging: false, backgroundColor: '#FFFFFF' })
            .then((canvas) => {
                const pdf = new JSPDF("p", "mm", "a4") // A4纸，纵向
                const ctx = canvas.getContext("2d");
                //未生成pdf的html页面高度
                let htmlHeight = canvas.height;
                const a4w = 190;
                const a4h = 257 // A4大小，210mm x 297mm，四边各保留20mm的边距
                const imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
                let renderedHeight = 0;
                let index = 0;
                //pdf页面偏移
                let position = 0;
                let canvas1 = document.createElement("canvas");
                let pageData = canvas.toDataURL('image/jpeg', 1.0)


                //当内容未超过pdf一页显示的范围，无需分页
                if (htmlHeight < imgHeight) {
                    pdf.addImage(
                        pageData,
                        'JPEG',
                        10,
                        10,
                        a4w, Math.min(a4h, a4w * canvas1.height / canvas1.width)
                    );
                    return pdf;
                } else {
                    try {
                        pdf.deletePage(0)
                        return this.createImpl(canvas, index, pdf, htmlHeight, imgHeight, position, canvas1);
                    } catch (err) {
                        return pdf;
                    }
                }
            })
    }

    exportPDFFile(element: HTMLElement, pdfName: string) {
        this.exportPDF(element).then((pdf: any) => {
            debugger;
            if (!pdf) return;
            pdf.save(pdfName + '.pdf')
        });
    }

    private createImpl(
        canvas: any, index: number, pdf: any, htmlHeight: number, imgHeight: number,
        position: number,
        canvas1: any): any {
        const a4Width = 595.28
        const a4Height = 841.89 //A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
        const a4w = 190;
        const a4h = 257 // A4大小，210mm x 297mm，四边各保留20mm的边距
        let height = 0;
        if (htmlHeight > 0) {
            index++;
            let checkCount = 0
            //设置背景色为白色，然后转成图片后，获取截断处图片像素点，从截断处往上一行行扫描像素点颜色，
            //碰到这一行颜色都是全白的，代表是从这里开始截断，将这个高度开始将往下的内容都放到下一页
            if (htmlHeight > imgHeight) {
                let i = position + imgHeight;
                for (i; i >= position; i--) {
                    let isNullLine = true; // 是否是空白像素行
                    for (var j = 0; j < canvas.width; j++) {
                        let c = canvas.getContext('2d').getImageData(j, i, 1, 1).data

                        if (c[0] != 0xff || c[1] != 0xff || c[2] != 0xff) {
                            isNullLine = false; // 只要有一个像素点不是白色，就代表该像素行是连续的
                            break
                        }
                    }
                    if (isNullLine) {
                        checkCount++;
                        if (checkCount >= 10) { // 连续超过10个空白像素行就换页
                            break
                        }
                    } else {
                        checkCount = 0
                    }
                }
                height = Math.round(i - position) || Math.min(htmlHeight, imgHeight)
                if (height <= 0) {
                    height = imgHeight
                }
            } else {
                height = htmlHeight
            }

            canvas1.width = canvas.width;
            canvas1.height = height;


            let ctx = canvas1.getContext('2d');
            if (!ctx) return;

            ctx.drawImage(
                canvas,
                0,
                position,
                canvas.width,
                height,
                0,
                0,
                canvas.width,
                height,
            )

            var pageHeight = Math.round((a4Width / canvas.width) * height)
            // pdf.setPageSize(null, pageHeight)
            if (position != 0) {
                pdf.addPage()
            }
            pdf.addImage(
                canvas1.toDataURL('image/jpeg', 1.0),
                'JPEG',
                10,
                10,
                a4w, Math.min(a4h, a4w * canvas1.height / canvas1.width)
            )
            htmlHeight -= height
            position += height
            if (htmlHeight > 0) {
                return this.createImpl(canvas, index, pdf, htmlHeight, imgHeight, position, canvas1);
            } else {
                // if (!!callback) {
                //     callback();
                // }
                // pdf.save(pdfName + '.pdf')
                return pdf;
            }
        } else {
            return pdf;
        }
    }

    exportWord(contentNode: any, pagetitle: string, callback?: () => void) {
        const mhtml = {
            top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
            head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
            body: "<body>_body_</body>"
        };
        const options = {
            maxWidth: 624,
        }
        let mhtmlBottom = '\n';
        const images: any[] = [];
        contentNode.querySelectorAll('canvas').forEach((v: any) => {
            var uri = v.toDataURL("image/png");
            var downloadUrl = uri.replace("image/png", "image/octet-stream");
            const elemParent = v.parentNode;
            const elemNew = document.createElement('img');
            elemNew.setAttribute('src', downloadUrl);
            elemNew.style.width = 625 + 'px';
            elemNew.style.height = v.offsetHeight + 'px';
            elemParent.replaceChild(elemNew, v);
            // Get data URL encoding of image
            images.push({
                type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                location: downloadUrl,
                data: uri.substring(uri.indexOf(",") + 1)
            });
        });


        for (var i = 0; i < images.length; i++) {
            mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
            mhtmlBottom += "Content-Location: " + images[i].location + "\n";
            mhtmlBottom += "Content-Type: " + images[i].type + "\n";
            mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
            mhtmlBottom += images[i].data + "\n\n";
        }
        mhtmlBottom += "--NEXT.ITEM-BOUNDARY--"
        const styles = `
        table {
          border: none;
        }
        table thead tr:last-child {
          border-bottom: 1px solid #D0D1D2;
        }
        table tbody tr:last-child {
          border-bottom: 1px solid #D0D1D2;
        }
        `;

        // Aggregate parts of the file together
        const fileContent = mhtml.top.replace("_html_", mhtml.head.replace("_styles_", styles) + mhtml.body.replace("_body_", contentNode.innerHTML)) + mhtmlBottom;

        var blob = new Blob([fileContent], {
            type: "application/msword;charset=utf-8"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', `${pagetitle}.doc`);
        a.style.visibility = 'hidden';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        if (!!callback) {
            callback();
        }
    }

    downloadDom(dom: HTMLElement, fileName: string) {
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