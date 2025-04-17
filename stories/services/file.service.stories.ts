import { Component, ElementRef } from '@angular/core';
import { FileService } from '@Services';
import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
    selector: 'app-file-demo',
    template: `
        <div class="countdown-container">
            <h2>file Demo</h2>
            <div class="flex gap-sm">
                <button nz-button nzType="primary" (click)="exportPDF()">exportPDF</button>
                <button nz-button nzType="primary" (click)="getHtmlPDFBlob()">getHtmlPDFBlob</button>
            </div>
            <div class="flex gap-sm">
                <button nz-button nzType="primary" (click)="exportPDF()">exportPDF</button>
                <button nz-button nzType="primary" (click)="getHtmlPDFBlob()">getHtmlPDFBlob</button>
            </div>
        </div>
    `,
    styles: [`
        button{ height: 1200px;margin-bottom: 20em;}
        .countdown-container {
            padding: 20px;
            text-align: center;
            font-family: Arial, sans-serif;
        }
        .countdown-display {
            font-size: 48px;
            margin: 20px;
            color: #2196F3;
        }
        .status {
            font-size: 24px;
            margin: 10px;
            color: #666;
        }
    `],
    imports: [CommonModule, NzButtonModule]
})
class FileDemoComponent {

    constructor(private fileService: FileService, private el: ElementRef) {
    }


    exportPDF() {
        this.fileService.exportPDFFile(this.el.nativeElement, 'test.pdf');
    }

    getHtmlPDFBlob() {
        // this.fileService.getHtmlPDFBlob(this.el.nativeElement, 'test.pdf').then();
    }

}

const meta: Meta<FileDemoComponent> = {
    component: FileDemoComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule, NzButtonModule]
        })
    ]
};

export default meta;

type Story = StoryObj<FileDemoComponent>;

export const base: Story = {
};