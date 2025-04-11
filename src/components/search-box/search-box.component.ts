/**
 * 搜索框组件
 * 提供实时搜索功能，支持防抖动处理
 */
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  imports: [
    CommonModule, FormsModule,
    NzInputModule, NzIconModule
  ],
  styles: [`:host{display:inline-flex;height: 28px;box-sizing: content-box;}`]
})
export class SearchBoxComponent {
  /** 搜索关键词 */
  @Input() public keyword: string = '';
  /** 搜索框占位符文本 */
  @Input() public placeholder: string = 'input search text';
  /** 是否禁用搜索框 */
  @Input() public disabled: boolean = false;
  /** 搜索框宽度 */
  @Input() public width = 120;
  /** 关键词变更事件发射器 */
  @Output() public keywordChange = new EventEmitter();
  /** 用于处理搜索关键词的 Subject */
  private _keyword$ = new Subject<string>();

  /**
   * 构造函数
   * 初始化关键词变更的订阅处理
   */
  constructor() {
    this._keyword$
      .pipe(
        // 仅当值发生变化时才触发
        distinctUntilChanged(),
        // 设置300ms的防抖时间
        debounceTime(300),
      )
      .subscribe((keyword) => {
        this.keywordChange.emit(keyword);
      });
  }

  /**
   * 处理输入框值变更
   * @param keyword 新的搜索关键词
   */
  public keywordUpdate(keyword: string) {
    this._keyword$.next(keyword);
  }

  /**
   * 提交搜索
   * 立即触发关键词变更事件
   */
  public submit(): void {
    this.keywordChange.emit(this.keyword);
  }

  /**
   * 取消搜索
   * 清空搜索框并触发关键词变更事件
   */
  public cancel(): void {
    this.keyword = '';
    this.keywordChange.emit(this.keyword);
  }
}
