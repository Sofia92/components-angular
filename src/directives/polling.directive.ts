/**
 * 轮询指令
 * 
 * 用于实现定期轮询数据的功能，支持自定义轮询间隔、重试次数和轮询条件。
 * 继承此指令的组件可以实现自定义的轮询逻辑。
 * 
 * @example
 * ```typescript
 * class MyComponent extends PollingDirective {
 *   ngOnInit() {
 *     this.polling(
 *       this.getData(), // 数据源
 *       3,              // 重试次数
 *       (response) => this.shouldContinue(response) // 轮询条件
 *     );
 *   }
 * }
 * ```
 */
import { Directive, Input, OnDestroy } from '@angular/core';
import { catchError, EMPTY, Observable, retry, Subscription, switchMap, takeWhile, timer } from 'rxjs';

@Directive()
export class PollingDirective implements OnDestroy {
    /** 轮询间隔时间（毫秒），默认2秒 */
    @Input() interval: number = 2000;

    /** 轮询的Observable流 */
    polling$: Observable<void>;

    /** 订阅对象，用于管理轮询的订阅 */
    private subscription?: Subscription;

    /** 是否正在轮询 */
    private _isPolling: boolean = false;

    /**
     * 组件销毁时取消订阅，防止内存泄漏
     */
    ngOnDestroy(): void {
        this._stopPolling();
    }

    /**
     * 设置轮询
     * 
     * @param source 数据源Observable，每次轮询都会调用
     * @param minRetry 最小重试次数，当请求失败时重试
     * @param condition 轮询条件函数，返回true继续轮询，false停止轮询
     * @throws Error 如果轮询已经在进行中
     */
    protected polling(source: Observable<any>, minRetry: number, condition: (response: any) => boolean) {
        if (this._isPolling) {
            throw new Error('Polling is already in progress');
        }

        this._isPolling = true;
        
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
                            this.pollingError(error);
                            return EMPTY; // 返回空Observable，不终止流
                        })
                    );
                }),
                // 根据条件决定是否继续轮询
                takeWhile(
                    // 检查响应是否满足继续轮询的条件
                    response => this._isPolling && condition(response),
                    true // 包含最后一个符合条件的响应
                )
            );
    }

    /**
     * 开始监听轮询结果
     * 
     * @throws Error 如果轮询未设置
     */
    protected listenPolling() {
        if (!this.polling$) {
            throw new Error('Polling is not set up. Call polling() first.');
        }

        this.subscription = this.polling$.subscribe({
            next: (response) => this.pollingNext(response),
            error: (err) => this.pollingError(err),
            complete: () => this.pollingComplete()
        });
    }

    /**
     * 处理轮询数据
     * 
     * @param response 轮询返回的数据
     */
    protected pollingNext(response: any) {
        console.log('Polling response:', response);
    }

    /**
     * 处理轮询错误
     * 
     * @param err 错误信息
     */
    protected pollingError(err: any) {
        console.error('Polling error:', err);
        this._stopPolling();
    }

    /**
     * 轮询完成时的处理
     */
    protected pollingComplete() {
        console.log('Polling completed');
        this._isPolling = false;
    }

    /**
     * 停止轮询
     */
    private _stopPolling() {
        this._isPolling = false;
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
}
