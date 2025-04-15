import { Component, EventEmitter, Input, Output } from "@angular/core";
import { default as assetsJson } from './util/list.json';
import { ngZorroIconCategoryNames, IAppIcon, IconType } from "./util";
import { CommonModule } from "@angular/common";
import { NzIconModule } from "ng-zorro-antd/icon";

@Component({
  selector: 'icon-select',
  template: `
<div class="assets-wrapper">
  <ul class="anticons-list">
    <ng-container *ngFor="let item of assets">
      <li *ngIf="item.icon_type=='icon'" [class.active]="icon?.icon==item.icon" (click)="updateIcon(item)">
        <nz-icon class="icon" [nzType]="item.icon" />
      </li>
      <li *ngIf="item.icon_type=='emoji'" [class.active]="icon?.icon==item.icon" (click)="updateIcon(item)">
         <nz-icon class="icon" [nzType]="item.icon" />
      </li>
      <li *ngIf="item.icon_type=='image'" [class.active]="icon?.icon_url==item.icon_url" (click)="updateIcon(item)">
        <img [src]="item.icon_url">
      </li>
    </ng-container>
  </ul>
</div>
<h3>Choose Style</h3>
<div *ngIf="icon" class="bg-wrapper">
  <div class="bg-box cursor-pointer" *ngFor="let background of iconBackgrounds; let i = index"
  [class.active]="icon.icon_background==background"
  (click)="updateIconBackground(background)">
    <span [style.background]="background" class="icon-box">
      <span *ngIf="icon.icon_type=='emoji'" [style.color]="i==0 ? '#000' : '#fff'"
        nz-icon [nzType]="icon.icon"></span>
      <img *ngIf="icon.icon_type=='image'" [src]="icon.icon_url">
    </span>
  </div>
</div>
`,
  styles: [`
.anticons-list {
    display: grid;
    grid-auto-rows: 40px;
    grid-template-columns: repeat(auto-fill, 40px);
    align-items: center;
    gap: 1px;
    justify-content: center;
    max-height: 200px;
    overflow: hidden auto;

    li {
      cursor: pointer;
      text-align: center;
      list-style: none;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }
    li:hover {
      background: #108AC9;
      color: #fff;
    }
    li.active {
      background: #3664d9;
      color: #fff;
    }
    .icon {
      font-size: 24px;
    }
    img {
      max-width: 32px;
      max-height: 32px;
      display: inline-block;
    }
}

.bg-wrapper{
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}
.bg-box{
      padding: 4px;
      border: 1.5px solid #fff;
      border-radius: 4px;
    }
.bg-box.active {
    border-color: #3664d9;
}
.icon-box{
    background: rgb(54, 100, 217);
    min-width: 32px;
    min-height: 32px;
    max-width: 60px;
    max-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
}

.icon-box img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

`],
  imports: [CommonModule, NzIconModule]
})
export class IconSelectComponent {
  @Input() icon: IAppIcon;
  @Output() iconChange = new EventEmitter<IAppIcon>();
  @Input() filter_icon_type: IconType;
  public assets: any[];
  public iconBackgrounds = [
    'inherit', '#3664D9', '#757575', '#8200FF', '#0DC4CB', '#2DC76D', '#FF3143',
    '#FD8701', '#FFC900', '#FF9900', '#FF6600', '#FEF7C3'
  ];


  constructor() {
    this.assets = [];
    Object.values(ngZorroIconCategoryNames()).forEach(icons => {
      const groupIcons = icons.map(icon => ({ icon_type: IconType.EMOJI, icon: icon, icon_url: null, name: icon + '' }));
      this.assets.push(...groupIcons);
    });
    (assetsJson as any[])
      .filter((item: any) => ['png', 'gif', 'jpg', 'svg'].includes(item.group))
      .forEach((item: any) => {
        this.assets.push(...(item.children.map((icon: any) => {
          const icon_type = icon.usingImg ? IconType.IMAGE : IconType.EMOJI;
          return {
            icon_type,
            icon: icon_type == IconType.EMOJI ? icon.nzType : null,
            icon_url: icon_type == IconType.IMAGE ? icon.path : null,
            name: icon.name
          }
        })))
      });
  }

  public get valid(): boolean {
    return !!this.icon?.icon_type && !!this.icon?.icon_background;
  }

  public ngOnInit(): void {
    if (!this.icon) {
      this.icon = { icon_type: IconType.EMOJI, icon: this.assets[0].icon, icon_url: '', icon_background: this.iconBackgrounds[1] };
    }
    if (this.filter_icon_type) {
      this.assets = this.assets.filter((asset: any) => this.filter_icon_type == IconType.IMAGE ? asset.icon_type == IconType.IMAGE : true);
    }
  }

  public updateIcon(asset: any) {
    if (!this.icon?.icon_background) {
      this.icon.icon_background = this.iconBackgrounds[1];
    }
    if (asset.icon_type == IconType.EMOJI) {
      this.icon = { ...this.icon, icon_type: IconType.EMOJI, icon: asset.icon, icon_url: '' };
    } else {
      this.icon = { ...this.icon, icon_type: IconType.IMAGE, icon: '', icon_url: asset.icon_url };
    }
    this.iconChange.emit(this.icon);
  }

  public updateIconBackground(background: string) {
    this.icon = { ...this.icon, icon_background: background };
    this.iconChange.emit(this.icon);
  }
}