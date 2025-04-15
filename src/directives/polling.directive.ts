/**
 * 轮询指令
 * 用于实现定期轮询数据的功能
 * 继承此指令的组件可以实现自定义的轮询逻辑
 */
import { Directive, Input, OnDestroy } from '@angular/core';
import { catchError, EMPTY, Observable, retry, Subscription, switchMap, takeWhile, timer } from 'rxjs';

@Directive()
export class PollingDirective implements OnDestroy {
    // 轮询间隔时间，默认2秒
    @Input() interval: number = 2000;
    // 轮询的Observable流
    polling$: Observable<void>;
    // 订阅对象，用于管理轮询的订阅
    private subscription: Subscription;

    /**
     * 组件销毁时取消订阅
     */
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    /**
     * 设置轮询
     * @param source 数据源Observable，每次轮询都会调用
     * @param minRetry 最小重试次数，当请求失败时重试
     * @param condition 轮询条件函数，返回true继续轮询，false停止轮询
     */
    protected polling(source: Observable<any>, minRetry: number, condition: (response: any) => boolean) {
        // 创建定时器Observable，立即开始，每隔interval时间触发一次
        this.polling$ = timer(0, this.interval)
            .pipe(
                // 每次定时器触发时，切换到新的数据源Observable
                switchMap(() => {
                    return source.pipe(
                        // 请求失败时重试指定次数
                        retry(minRetry),
                        // 错误处理，发生错误时继续轮询
                        catchError(error => {
                            console.error('请求失败:', error);
                            return EMPTY; // 返回空Observable，不终止流
                        })
                    );
                }),
                // 根据条件决定是否继续轮询
                takeWhile(
                    // 检查响应是否满足继续轮询的条件
                    response => condition(response),
                    true // 包含最后一个符合条件的响应
                )
            );
    }

    /**
     * 开始监听轮询结果
     */
    protected listenPolling() {
        this.polling$.subscribe({
            next: (response) => this.pollingNext(response),
            error: (err) => this.pollingError(err),
            complete: () => this.pollingComplete()
        });
    }

    /**
     * 处理轮询数据
     * @param response 轮询返回的数据
     */
    protected pollingNext(response: any) {
        console.log(response);
    }

    /**
     * 处理轮询错误
     * @param err 错误信息
     */
    protected pollingError(err: any) {
        console.log(err);
    }

    /**
     * 轮询完成时的处理
     */
    protected pollingComplete() {
        console.log('轮询完成');
    }
}
