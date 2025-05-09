import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ScrollDirective } from '@Directives';
import { NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const meta: Meta<ScrollDirective> = {
  title: 'Directives/ScrollDirective',
  decorators: [
    moduleMetadata({
      imports: [ScrollDirective],
    }),
  ]
};

export default meta;

type Story = StoryObj<ScrollDirective>;

let preLoad = true, nextLoad = true;
let cardList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const base: Story = {
  render: () => ({
    props: {
      preLoad, nextLoad,
      cardList,
      zone: new NgZone({ enableLongStackTrace: false }),
      scrollToTop: function () {
        if (!preLoad) return;
        this.zone.run(() => {
          cardList.unshift(0);
          preLoad = false;
        });
      },
      scrollToBottom: function () {
        this.zone.run(() => {
          if (!nextLoad) return;
          cardList.push(11);
          nextLoad = false;
        });
      }
    },
    template: `
        <div style="width:400px; height: 300px; overflow-y: auto; border: 1px solid #ccc;"
                    appScroll
                    (scrollToTop)="scrollToTop()"
                    (scrollToBottom)="scrollToBottom()">
            <ul style="margin: 0; padding: 0;" >
                <li *ngFor="let item of cardList" 
                    style="height: 100px; background-color: #f0f0f0; margin-bottom: 10px; list-style: none;">
                    {{item}}
                </li>
            </ul>
        </div>
        `,
  })
}

