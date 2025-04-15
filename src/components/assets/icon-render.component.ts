import { CommonModule } from "@angular/common";
import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { NzIconModule } from "ng-zorro-antd/icon";
import { IconType } from "./util";

@Component({
  selector: 'icon-render',
  template: `
  <ng-container [ngSwitch]="icon_type">
    <span *ngSwitchCase="IconType.EMOJI" class="icon-box">
      <i *ngIf="isOriginEmoji">{{icon}}</i>
      <i *ngIf="!isOriginEmoji" nz-icon [nzType]="icon" [style.color]="icon_color" [style.font-size.px]="icon_size"></i>
    </span>

    <span *ngSwitchCase="IconType.ICON" class="icon-box">
      <i *ngIf="isOriginEmoji">{{icon}}</i>
      <i *ngIf="!isOriginEmoji" nz-icon [nzType]="icon" [style.color]="icon_color" [style.font-size.px]="icon_size"></i>
    </span>

    <ng-container *ngSwitchCase="IconType.IMAGE">
      <span class="img-box"><img [src]="icon_url" /></span>
    </ng-container>
  </ng-container>
    `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    :host.round {
      border-radius:100%;
    }
    :host:not(.round) {
      border-radius: 4px;
    }
    .icon-box {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .img-box {
      overflow: hidden;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .img-box img {
      max-width: 100%;
      max-height: 100%;
    }
`],
  imports: [CommonModule, NzIconModule]
})
export class IconRenderComponent implements OnInit {
  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  @Input() width: number = 24;
  @HostBinding('style.backgroundColor') @Input() icon_background = "#F3F4F6";
  @HostBinding('class.round') @Input() round = false;

  @Input() icon_type: IconType; //  "emoji",

  @Input() icon = "🤖";
  @Input() icon_url: string;
  @Input() icon_color = '#fff';
  @Input() icon_size: number = 16;

  IconType = IconType;
  isOriginEmoji = false;

  ngOnInit(): void {
    this.icon = this.icon || "🤖";
    this.icon_background = this.icon_background || "#F3F4F6";
    this.isOriginEmoji = !this.icon.startsWith('icons:') && /\p{Emoji}/u.test(this.icon);
  }

}