import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PollingDirective } from '@Directives';
import { uuidv4 } from '@Utils';
import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { format } from 'date-fns';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector: 'polling-demo',
    standalone: true,
    template: `
        <div>
            <button nz-button nzType="primary" (click)="startPolling()" [disabled]="isPolling">开始轮询</button>
            <button nz-button nzType="primary" (click)="stopPolling()" [disabled]="!isPolling">停止轮询</button>
            <div style="margin-top: 20px;">
                <h3>轮询结果 {{loading.success ? '成功' : loading.error ? '失败' : isPolling ? '轮询中' : '未开始'}}
                    <span *ngIf="isPolling && !loading.success && !loading.error" nz-icon nzType="loading"></span>
                  
                    <span *ngIf="loading.success">
                        <span nz-icon nzType="check-circle" nzTheme="outline"></span>
                    </span>
                    <span *ngIf="loading.error">
                        <span nz-icon nzType="close-circle" nzTheme="outline"></span>
                    </span>
                </h3>  
                <small>假定随机数>0.8为成功，否则继续查询</small>
                <p>
                @for (result of pollingResults; track result.id) {
                    <div>
                        {{result.data}}
                    </div>
                }
                </p>
            </div>
        </div>
    `,
    imports: [PollingDirective, CommonModule, FormsModule, NzIconModule, NzButtonModule]
})
class PollingDemoComponent extends PollingDirective implements OnInit {
    pollingResults: any[] = [];
    isPolling = false; // 是否开启轮询
    loading = { success: false, error: false };
    randomData = () => Math.random().toFixed(2);

    ngOnInit() {
        // 设置轮询条件：接口状态pending则一直轮询，除非手动停止或者轮询成功｜失败
        this.polling(this.mockApi(), 2, (response) => this.isPolling ? response.status == 'pending' : false);
    }
    // 模拟API请求
    mockApi() {
        return new Observable(subscriber => {
            const data = this.randomData();
            subscriber.next({
                id: uuidv4(),
                timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                data,
                status: +data < 0.8 ? 'pending' : 'success'
            });
            subscriber.complete();
        });
    }
    startPolling() {
        this.isPolling = true;
        this.pollingResults = [];
        this.loading = { success: false, error: false };
        this.listenPolling();
    }

    stopPolling() {
        this.isPolling = false;
        this.loading = { success: false, error: false };
    }

    protected override pollingNext(response: any) {
        this.pollingResults = [...this.pollingResults, response];
        this.loading = { success: false, error: false };
    }

    protected override pollingError(err: any) {
        this.isPolling = false;
        this.loading = { success: false, error: true };
    }

    protected override pollingComplete() {
        this.isPolling = false;
        this.loading = { success: true, error: false };
    }
}

const meta: Meta<PollingDemoComponent> = {
    title: 'Directives/Polling',
    component: PollingDemoComponent,
    decorators: [
        moduleMetadata({
            imports: [PollingDemoComponent],
        }),
    ]
};

export default meta;

type Story = StoryObj<PollingDemoComponent>;

export const base: Story = {
    args: {
        interval: 2000 // 默认2秒轮询一次
    }
};
