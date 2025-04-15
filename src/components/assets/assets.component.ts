import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import * as assets from './util/list.json';
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { ngZorroIconCategoryNames } from "./util";

@Component({
  template: `
    <h4>组件库图标</h4>
<div class="group" *ngFor="let obj of categories|keyvalue; let i = index">

  <h4>{{obj.key}}</h4>
  <div class="group-subGroup">
    <div class="item" *ngFor="let icon of obj.value">
      <span class="img-wrapper">
        <span sds-icon [nzType]="icon" style="font-size: 40px;color: #4D4D4D"></span>
      </span>
      <span sds-typography nzCopyable [nzCopyText]="getIconCopyText(icon)" sds-tooltip [nzTooltipTitle]="titleTemplate"
        [nzTooltipTitleContext]="{ $implicit: icon }">
        <i class="file-name">{{icon}}</i>
        <ng-template #titleTemplate let-item>
          <p>图标方式引用: </p>
          <p>{{ getIconCopyText(icon) }}</p>
        </ng-template>
      </span>
    </div>
  </div>
</div>
<div class="group" *ngFor="let group of assets">
  <h4>{{group.group}}</h4>
  <div class="group-subGroup">
    <div class="item" *ngFor="let item of group.children">
      <span class="img-wrapper">
        <span *ngIf="item.isIcon" sds-icon [nzType]="item.nzType" style="font-size: 40px;color: #4D4D4D"></span>
        <img *ngIf="item.usingImg" sds-image [nzSrc]="item.path" />
      </span>

      <span sds-typography nzCopyable [nzCopyText]="getCopyText(item)" sds-tooltip [nzTooltipTitle]="titleTemplate"
        [nzTooltipTitleContext]="{ $implicit: item }">
        <i class="file-name">{{item.name}}</i>
        <ng-template #titleTemplate let-item>
          <p>资源路径: </p>
          <p>{{ item.path }}</p>

          <p *ngIf="item.isIcon">图标方式引用: </p>
          <p *ngIf="item.isIcon">{{ getCopyText(item) }}</p>
        </ng-template>
      </span>
    </div>
  </div>
</div>
    `,
  styles: [`
    .group {
        margin: 16px;
        padding: 12px 16px;
        border-radius: 4px;
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
    }
    .group-subGroup {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
    }
    .item {
        display: grid;
        grid-template-rows: minmax(0, 1fr) 28px;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
    }

    .img-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item img {
        max-width: 100px;
        max-height: 80px;
        min-height: 48px;
    }
    .ant-typography {
        display: inline-flex;
    }
    .file-name {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 80px;
    }
    `],
  imports: [CommonModule, FormsModule, NzIconModule, NzTypographyModule, NzImageModule, NzToolTipModule]
})
export class AppAssets implements OnInit {
  public assets: any;
  public categories: { 通用操作: string[]; 导航及指示: string[]; 图表相关: string[]; 角色相关: string[]; 符号和标识: string[]; 办公文档: string[]; 业务相关: string[]; 快捷键: string[]; };

  constructor() { }

  public ngOnInit(): void {
    this.assets = assets['default'];
    this.categories = ngZorroIconCategoryNames();
  }

  public getIconCopyText(nzType: string) {
    return `<span sds-icon nzType="${nzType}"></span>`;
  }

  public getCopyText(item: any) {
    switch (true) {
      case item.isIcon:
        return `<span sds-icon nzType="${item.nzType}"></span>`;
      case item.usingImg:
        return `<img src="${item.path}">`;
      case !item.isIcon && !item.usingImg:
        return item.path;
    }
  }

}