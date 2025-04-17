import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CountdownService } from '@Services';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
    selector: 'app-countdown-demo',
    template: `
        <div class="countdown-container">
            <h2>Countdown Demo</h2>
            <div class="flex gap-sm">
                <button nz-button nzType="primary" (click)="startCountdown()">Start Countdown</button>
                <button nz-button nzType="primary" (click)="pauseCountdown()">Pause</button>
                <button nz-button nzType="primary" (click)="resumeCountdown()">Resume</button>
                <button nz-button nzType="primary" (click)="stopCountdown()">Stop</button>
            </div>
            <div class="countdown-display" *ngIf="countdown$ | async as countdown">
                {{ countdown }}
            </div>
            <div class="status" *ngIf="isPaused$ | async as isPaused">
                {{ isPaused ? 'Paused' : 'Running' }}
            </div>
        </div>
    `,
    styles: [`
        .countdown-container {
            padding: 20px;
            text-align: center;
            font-family: Arial, sans-serif;
        }
        .countdown-display {
            font-size: 48px;
            margin: 20px;
            color: #2196F3;
        }
        .status {
            font-size: 24px;
            margin: 10px;
            color: #666;
        }
    `],
    imports: [CommonModule, NzButtonModule]
})
class CountdownDemoComponent implements OnInit, OnDestroy {
    @Input() duration: number;
    countdown$: Observable<string>;
    isPaused$: Observable<boolean>;

    constructor(private countdownService: CountdownService) {
        this.countdown$ = this.countdownService.countdown$;
        this.isPaused$ = this.countdownService.isPaused$;
    }

    ngOnInit() {
        if (this.duration) {
            this.startCountdown(this.duration);
        }
    }

    startCountdown(duration?: number) {
        this.countdownService.startCountdown(duration || this.duration);
    }

    pauseCountdown() {
        this.countdownService.pauseCountdown();
    }

    resumeCountdown() {
        this.countdownService.resumeCountdown();
    }

    stopCountdown() {
        this.countdownService.stopCountdown();
    }

    ngOnDestroy() {
        this.countdownService.stopCountdown();
    }
}

const meta: Meta<CountdownDemoComponent> = {
    title: 'Services/CountdownService',
    component: CountdownDemoComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule, NzButtonModule]
        })
    ]
};

export default meta;

type Story = StoryObj<CountdownDemoComponent>;

export const base: Story = {
    args: {
        duration: 10
    }
};