import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TraceHighlightDirective } from '@Directives';
import { BehaviorSubject } from 'rxjs';
import { SearchBoxComponent } from '@Components';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-trace-highlight-demo',
  template: `
    <div class="demo-container">
      <div class="search-section">
        <search-box [placeholder]="'输入搜索关键词'"
                    [(keyword)]="searchKeyword"
                    (keywordChange)="onSearch()"></search-box>
        <p>结果：{{ hightTraceIdSet.size }}个
          <button *ngIf="hightTraceIdSet.size" nz-button nzType="primary" (click)="prevHighlightId()">上一个</button>
          <button *ngIf="hightTraceIdSet.size" nz-button nzType="primary" (click)="nextHighlightId()">下一个</button>
        </p>
      </div>

      <div class="content-section" [traceHighlight]="traceHighlightConfig" [highlightId]="highlightId" (hightTraceIdSetChange)="onHightTraceIdSetChange($event)">
        <div class="content-block">
          <h3>病历记录</h3>
          <p>患者主诉：<span data-field="symptom">发热、咳嗽3天</span></p>
          <p>现病史：<span data-field="history">患者3天前出现发热，体温最高38.5℃，伴有咳嗽，无痰。</span></p>
          <p>既往史：<span data-field="past">无特殊</span></p>
        </div>

        <div class="content-block">
          <h3>检查报告</h3>
          <p>血常规：<span data-field="blood">WBC 10.5×10^9/L</span></p>
          <p>胸片：<span data-field="xray">双肺纹理增多</span></p>
        </div>

        <div class="content-block">
          <h3>诊断结果</h3>
          <p>初步诊断：<span data-field="diagnosis">上呼吸道感染</span></p>
          <p>建议：<span data-field="suggestion">建议多休息，多饮水</span></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-section {
      margin-bottom: 20px;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .content-block {
      margin-bottom: 16px;
      padding: 16px;
      border: 1px solid #e8e8e8;
      border-radius: 8px;
    }
    h3 {
      margin: 0 0 16px 0;
      color: #1976D2;
    }
    p {
      margin: 8px 0;
      line-height: 1.5;
    }
    span[data-field] {
      color: #333;
    }
  `],
  standalone: true,
  imports: [CommonModule, FormsModule, NzIconModule, TraceHighlightDirective, SearchBoxComponent]
})
export class TraceHighlightDemoComponent {
  traceHighlightConfig = {
    keyword: '',
    onHighlight$: new BehaviorSubject<any>(false),
  }
  searchKeyword = '';
  hightTraceIdSet = new Set<string>();
  highlightId = '';

  onSearch() {
    this.traceHighlightConfig.keyword = this.searchKeyword;

    if (!this.searchKeyword.trim()) {
      // 如果搜索关键词为空，发送空数组来清除高亮
      this.traceHighlightConfig.onHighlight$.next([]);
    } else {
      // 有搜索关键词时，发送搜索数据
      this.traceHighlightConfig.onHighlight$.next([{ fieldName: 'data-field', keyword: this.searchKeyword }]);
    }
  }

  onHightTraceIdSetChange(hightTraceIdSet: Set<string>) {
    this.hightTraceIdSet = hightTraceIdSet;
    this.highlightId = Array.from(hightTraceIdSet)[0];
  }
  prevHighlightId() {
    const ids = Array.from(this.hightTraceIdSet);
    const index = ids.indexOf(this.highlightId);
    this.highlightId = ids[index - 1] || ids[ids.length - 1];
  }

  nextHighlightId() {
    const ids = Array.from(this.hightTraceIdSet);
    const index = ids.indexOf(this.highlightId);
    this.highlightId = ids[index + 1] || ids[0];
  }
} 