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
            onMutationChange: function (mutation: MutationRecord) {
                console.log('Child list changed:', mutation);
            },
            items: ['Item 1', 'Item 2', 'Item 3'],
            addItem: function () {
                if (this.items) {
                    this.items.push(`Item ${this.items.length + 1}`);
                }
            },
            removeItem: function () {
                if (this.items && this.items.length > 0) {
                    this.items.pop();
                }
            }
        },
        template: `
            <div class="demo-container">
                <div 
                    appMutationObserver 
                    (mutationChange)="onMutationChange($event)"
                    class="observable-element"
                >
                    <div *ngFor="let item of items">{{item}}</div>
                </div>
                
                <div class="controls">
                    <button (click)="addItem()">Add Item</button>
                    <button (click)="removeItem()">Remove Item</button>
                </div>
            </div>
        `,
        styles: [`
            .demo-container {
                padding: 20px;
            }
            .observable-element {
                padding: 10px;
                margin: 10px 0;
                border: 1px solid #ccc;
            }
            .controls {
                display: flex;
                gap: 10px;
                margin-top: 10px;
            }
            button {
                padding: 8px 16px;
                cursor: pointer;
            }
        `]
    })
};
