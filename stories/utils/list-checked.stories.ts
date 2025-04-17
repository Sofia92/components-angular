import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { isAllChecked, isHalfChecked } from '@Utils';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';

interface ListItem {
    id: number;
    name: string;
    checked: boolean;
}

const meta: Meta<any> = {
    title: 'Utils/List Checked',
    decorators: [
        moduleMetadata({
            imports: [NzCheckboxModule, FormsModule]
        })
    ]
};

export default meta;
type Story = StoryObj<any>;

export const AllChecked: Story = {
    render: () => ({
        props: {
            isAllChecked: false,
            indeterminate: false,
            items: [
                { id: 1, name: 'Item 1', checked: false },
                { id: 2, name: 'Item 2', checked: false },
                { id: 3, name: 'Item 3', checked: false }
            ],
            checkChange: function (checked: boolean) {
                this.items.forEach((item: ListItem) => item.checked = checked);
                this.isAllChecked = isAllChecked(this.items, 'checked');
                this.indeterminate = isHalfChecked(this.items, 'checked');
            },
            itemCheckChange: function (checked: boolean, item: ListItem) {
                item.checked = checked;
                this.isAllChecked = isAllChecked(this.items, 'checked');
                this.indeterminate = isHalfChecked(this.items, 'checked');
            }
        },
        template: `
      <div class="story-container">
        <label class="check-box-group"
            nz-checkbox
            [ngModel]="isAllChecked"
            [nzIndeterminate]="indeterminate"
            (ngModelChange)="checkChange($event)">全选</label>
        <h3>List Items: </h3>
        <div>
          <p *ngFor="let item of items">
            <label nz-checkbox [ngModel]="item.checked" (ngModelChange)="itemCheckChange($event, item)">
              {{item.name}}
            </label>
          </p>
        </div>
        <div class="status">
        </div>
      </div>
    `
    }),
};
