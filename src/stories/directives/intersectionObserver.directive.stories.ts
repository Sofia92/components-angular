import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { IntersectionObserverDirective } from '@Directives';
import { NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const meta: Meta<IntersectionObserverDirective> = {
    title: 'Directives/IntersectionObserver',
    decorators: [
        moduleMetadata({
            imports: [IntersectionObserverDirective],
        }),
    ]
};

export default meta;

type Story = StoryObj<IntersectionObserverDirective>;

const loadMore$ = new BehaviorSubject<boolean>(true);
let cardList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const base: Story = {
    render: () => ({
        props: {
            loadMore$,
            cardList,
            zone: new NgZone({ enableLongStackTrace: false }),
            visible: function () {
                this.zone.run(() => {
                    cardList.push(11);
                    loadMore$.next(false);
                });
            }
        },
        template: `
        <div style="width:400px; height: 300px; overflow-y: auto; border: 1px solid #ccc;">
            <ul style="margin: 0; padding: 0;">
                <li *ngFor="let item of cardList" 
                    style="height: 100px; background-color: #f0f0f0; margin-bottom: 10px; list-style: none;">
                    {{item}}
                </li>
                <li *ngIf="loadMore$ | async"
                    appIntersectionObserver
                    (visible)="visible()"
                    style="height: 50px; background-color: #f0f0f0; list-style: none;">
                    <span>加载中.......</span>
                </li>
            </ul>
        </div>
        `,
    })
}

