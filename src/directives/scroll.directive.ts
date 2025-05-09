/**
 * 滚动指令
 * 
 * 用于监听元素的滚动事件，并触发相应的回调函数。
 * 
*/
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  @Output() scrollToTop = new EventEmitter<void>();
  @Output() scrollToBottom = new EventEmitter<void>();

  private readonly threshold = 50; // 触发阈值，距离顶部或底部多少像素时触发

  constructor(private elementRef: ElementRef) { }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    // 检查是否滚动到底部
    if (scrollHeight - scrollTop - clientHeight < this.threshold) {
      this.scrollToBottom.emit();
    }

    // 检查是否滚动到顶部
    if (scrollTop < this.threshold) {
      this.scrollToTop.emit();
    }
  }
}