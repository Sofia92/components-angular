import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MutationObserverDirective } from '@Directives';
import { pick } from 'lodash';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

const meta: Meta<MutationObserverDirective> = {
    title: 'Directives/MutationObserver',
    component: MutationObserverDirective,
    decorators: [
        moduleMetadata({
            imports: [CommonModule, NzInputModule, NzButtonModule]
        })
    ]
};

export default meta;
type Story = StoryObj<MutationObserverDirective>;

/**
 * Basic usage example showing how to monitor attribute changes
 */
export const AttributeChanges: Story = {
    render: () => ({
        props: {
            padding: '10px',
            backgroundColor: '#ffffff',
            domChanges: [],
            reset: function () {
                this.padding = '10px';
                this.backgroundColor = '#ffffff';
                this.domChanges = this.domChanges || [];
            },
            onMutationChange: function (mutation: MutationRecord) {
                const change = {
                    ...pick(mutation, ['type', 'attributeName', 'oldValue']),
                    attributeNow: (mutation.target as HTMLElement).getAttribute(mutation.attributeName as string)
                };
                this.domChanges.push(change);
            },
        },
        template: `
            <div class="demo-container">
                <input appMutationObserver 
                    (mutationChange)="onMutationChange($event)" nz-input placeholder="Watch me change!"
                    [style.padding]="padding"
                    [style.backgroundColor]="backgroundColor"/>
                
                <div class="flex gap-md">
                    <button nz-button nzType="primary" (click)="padding = '20px'">Add Padding</button>
                    <button nz-button nzType="primary" (click)="backgroundColor = '#ff0000'">Change Color</button>
                    <button nz-button nzType="default" (click)="reset()">Clear</button>
                </div>
            </div>
            <div>
                <table>
                    <tr>
                        <th>Type</th>
                        <th>Attribute</th>
                        <th>Target</th>
                        <th>Old Value</th>
                    </tr>
                    <tr *ngFor="let change of domChanges">
                        <td class="padding-xs">{{change.type}}</td>
                        <td class="padding-xs">{{change.attributeName}}</td>
                        <td class="padding-xs">{{change.attributeNow}}</td>
                        <td class="padding-xs">{{change.oldValue}}</td>
                    </tr>
                </table>
            </div>
        `
    })
};

/**
 * Example showing how to monitor child list changes
 */
export const ChildListChanges: Story = {
    render: (args) => ({
        props: {
            items: ['Item 1', 'Item 2', 'Item 3'],
            domChanges: [],
            reset: function () {
                this.items = ['Item 1', 'Item 2', 'Item 3'];
                this.domChanges = this.domChanges || [];
            },
            onMutationChange: function (mutation: MutationRecord) {
                const change = {
                    type: mutation.type,
                    addedNodes: [...mutation.addedNodes].map(d => (d as HTMLElement).innerText).join(', '),
                    removedNodes: [...mutation.removedNodes].map(d => (d as HTMLElement).innerText).join(', ')
                };
                this.domChanges.push(change);
            },
            addItem: function () {
                this.items.push(`Item ${this.items.length + 1}`);
            },
            removeItem: function () {
                this.items.pop();
            }
        },
        template: `
            <div class="demo-container">
                <div class="bordered padding-md"
                    appMutationObserver 
                    (mutationChange)="onMutationChange($event)"
                >
                    <div *ngFor="let item of items">{{item}}</div>
                </div>
                
                <div class="flex gap-md">
                    <button nz-button nzType="primary" (click)="addItem()">Add Item</button>
                    <button nz-button nzType="primary" [disabled]="!items.length" (click)="removeItem()">Remove Item</button>
                </div>
            </div>
            <div class="padding-top-lg">
                <table>
                    <tr>
                        <th>Type</th>
                        <th>addedNodes</th>
                        <th>removedNodes</th>
                    </tr>
                    <tr *ngFor="let change of domChanges">
                        <td class="padding-xs">{{change.type}}</td>
                        <td class="padding-xs">{{change.addedNodes}}</td>
                        <td class="padding-xs">{{change.removedNodes}}</td>
                    </tr>
                </table>
            </div>
        `
    })
};
