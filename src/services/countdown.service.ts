import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CountdownService implements OnDestroy {
    private countdownSubject = new BehaviorSubject<string>('');
    private timerSubscription?: Subscription;
    private pauseSubject = new BehaviorSubject<boolean>(false);
    private remainingTime: number = 0;

    public countdown$: Observable<string> = this.countdownSubject.asObservable();
    public isPaused$: Observable<boolean> = this.pauseSubject.asObservable();

    constructor() { }

    public startCountdown(duration: number = 5): void {
        this.cleanup();
        this.remainingTime = duration;
        this.startTimer(duration);
    }

    /**
     * 暂停
     */
    public pauseCountdown(): void {
        if (this.timerSubscription && !this.pauseSubject.value) {
            this.pauseSubject.next(true);
            this.timerSubscription.unsubscribe();
        }
    }

    /**
     * 恢复
     */
    public resumeCountdown(): void {
        if (this.pauseSubject.value) {
            this.pauseSubject.next(false);
            this.startTimer(this.remainingTime);
        }
        if (!this.timerSubscription) {
            this.startTimer(this.remainingTime);
        }
    }

    /**
     * 开始计时
     * @param duration 
     */
    private startTimer(duration: number): void {
        this.timerSubscription = timer(0, 1000)
            .pipe(
                take(duration + 2),
                map(value => {
                    const remaining = duration - value;
                    this.remainingTime = remaining;
                    return `${remaining}s`;
                })
            )
            .subscribe({
                next: (text) => {
                    this.countdownSubject.next(text);
                },
                complete: () => {
                    this.countdownSubject.next('');
                    this.cleanup();
                },
                error: (error) => {
                    console.error('Countdown error:', error);
                    this.cleanup();
                }
            });
    }

    public stopCountdown(): void {
        this.cleanup();
        this.countdownSubject.next('');
        this.pauseSubject.next(false);
        this.remainingTime = 0;
    }

    private cleanup(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            this.timerSubscription = undefined;
        }
    }

    ngOnDestroy(): void {
        this.cleanup();
    }
}