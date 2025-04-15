/**
 * 轮询
 */
import { Directive, Input, OnDestroy } from '@angular/core';
import { catchError, EMPTY, Observable, retry, Subscription, switchMap, takeWhile, timer } from 'rxjs';

@Directive()
export class PollingDirective implements OnDestroy {
    polling$: Observable<void>;
    private subscription: Subscription;
    @Input() interval: number = 2000;

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    protected polling(source: Observable<any>, minRetry: number, condition: (response: any) => boolean) {
        this.polling$ = timer(0, this.interval)
            .pipe(
                switchMap(() => {
                    // 每次轮询都创建一个新的 Observable
                    return source.pipe(
                        retry(minRetry),
                        // 错误时静默继续轮询
                        catchError(error => {
                            console.error('请求失败:', error);
                            return EMPTY; // 不终止流
                        })
                    );
                }),
                // 停止条件逻辑
                takeWhile(
                    // 检查未完成沦陷条件
                    response => condition(response),
                    true // 包含最后一个符合条件的响应
                )
            );
    }

    protected listenPolling() {
        this.polling$.subscribe({
            next: (response) => this.pollingNext(response),
            error: (err) => this.pollingError(err),
            complete: () => this.pollingComplete()
        });
    }

    protected pollingNext(response: any) {
        console.log(response);
    }
    protected pollingError(err: any) {
        console.log(err);
    }
    protected pollingComplete() {
        console.log('轮询完成');
    }
}
