/**
 * 抛物线动画指令
 * 用于创建从触发元素到目标元素的抛物线动画效果
 * 
 * @example
 * ```html
 * <button appBallParabola [isAnimationEnabled]="true" targetDomId="target">Click Me</button>
 * <div id="target">Target Element</div>
 * ```
 */

import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Input, Optional, Output, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[appBallParabola]',
})
export class BallParabolaDirective implements AfterViewInit, OnDestroy {
  /** 控制抛物线动画是否启用 */
  @Input() public isAnimationEnabled: boolean = false;

  /** 目标元素的 DOM ID */
  @Input() public targetDomId: string;

  /** 抛物线动画完成时触发的事件 */
  @Output() public finishParabola: EventEmitter<void> = new EventEmitter<void>();

  /** 点击事件订阅 */
  private clickSubscription: Subscription | null = null;

  /** 动画小球的样式配置 */
  private readonly BALL_STYLES = {
    initial: {
      width: '14px',
      height: '14px',
      borderRadius: '7px',
      backgroundColor: 'red',
      position: 'absolute',
      transition: 'left 1s, top 1s'
    },
    final: {
      width: '6px',
      height: '6px',
      borderRadius: '3px',
      transition: 'left 1s ease-in, top 0.6s linear, width 0.7s linear, height 0.7s linear, borderRadius 0.7s linear'
    }
  };

  /** 动画时间配置（毫秒） */
  private readonly ANIMATION_TIMING = {
    initialDelay: 20,
    duration: 1500
  };

  constructor(
    private readonly elementRef: ElementRef,
    @Optional() @Inject(DOCUMENT) private readonly document: Document
  ) {}

  /**
   * 组件初始化后，根据动画开关状态决定是否监听点击事件
   */
  public ngAfterViewInit(): void {
    this.updateClickSubscription();
  }

  /**
   * 组件销毁时，清理订阅
   */
  public ngOnDestroy(): void {
    this.unsubscribeClick();
  }

  /**
   * 更新点击事件订阅状态
   */
  private updateClickSubscription(): void {
    this.unsubscribeClick();

    if (this.isAnimationEnabled) {
      this.clickSubscription = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click')
        .pipe(distinctUntilChanged())
        .subscribe((event) => {
          this.createParabolaBall(event);
        });
    }
  }

  /**
   * 取消点击事件订阅
   */
  private unsubscribeClick(): void {
    if (this.clickSubscription) {
      this.clickSubscription.unsubscribe();
      this.clickSubscription = null;
    }
  }

  /**
   * 创建并执行抛物线动画
   * @param event 点击事件对象
   */
  private createParabolaBall(event: MouseEvent): void {
    const ball = this.createBallElement();
    const targetElement = this.document.getElementById(this.targetDomId);
    
    if (!targetElement) {
      console.warn(`Target element with id "${this.targetDomId}" not found`);
      return;
    }

    this.positionBall(ball);
    this.animateBall(ball, targetElement);
  }

  /**
   * 创建动画小球元素
   */
  private createBallElement(): HTMLDivElement {
    const ball = this.document.createElement('div');
    ball.className = 'parabola-ball';
    Object.assign(ball.style, this.BALL_STYLES.initial);
    this.document.body.appendChild(ball);
    return ball;
  }

  /**
   * 设置小球的初始位置
   * @param ball 小球元素
   */
  private positionBall(ball: HTMLDivElement): void {
    const originRect = this.elementRef.nativeElement.getBoundingClientRect();
    ball.style.top = `${originRect.top}px`;
    ball.style.left = `${originRect.left + originRect.width / 2}px`;
  }

  /**
   * 执行小球动画
   * @param ball 小球元素
   * @param targetElement 目标元素
   */
  private animateBall(ball: HTMLDivElement, targetElement: HTMLElement): void {
    const targetRect = targetElement.getBoundingClientRect();
    
    // 设置最终位置和样式
    setTimeout(() => {
      Object.assign(ball.style, this.BALL_STYLES.final);
      ball.style.top = `${targetRect.top - 2}px`;
      ball.style.left = `${targetRect.left + targetRect.width - 3}px`;
    }, this.ANIMATION_TIMING.initialDelay);

    // 清理动画元素
    setTimeout(() => {
      if (this.document.body.contains(ball)) {
        this.document.body.removeChild(ball);
      }
      this.finishParabola.emit();
    }, this.ANIMATION_TIMING.duration);
  }
}
