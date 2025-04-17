import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FileSizePipe } from '@Pipes';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
const meta: Meta<FileSizePipe> = {
    title: 'Pipes/fileSize',
    decorators: [
        moduleMetadata({
            imports: [FileSizePipe, FormsModule, NzInputNumberModule, NzButtonModule],
        }),
    ],
};

export default meta;

type Story = StoryObj<FileSizePipe>;

let size = 0;
let sizeDisplay = 0;
export const base: Story = {
    parameters: {
        size: size,
        sizeDisplay: sizeDisplay
    },
    render: () => ({
        template: `
        <nz-input-number [(ngModel)]="size" />
        <button nz-button nzType="primary" (click)="sizeDisplay = size">转换</button>
        
        <p>结果：{{sizeDisplay | fileSize}}</p>
        `,
    })
}

