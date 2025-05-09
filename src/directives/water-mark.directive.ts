import { Directive, ElementRef, HostBinding, Renderer2, AfterViewInit, Input } from '@angular/core';
import { format } from 'date-fns';

@Directive({
  selector: '[appWaterMark]'
})
export class WaterMarkDirective implements AfterViewInit {
  @Input() name: string;
  @Input() isDisplay: boolean;
  @HostBinding('style.position') public positionStyle = 'relative';

  constructor(private el: ElementRef,
    private renderer: Renderer2) {
  }

  public async ngAfterViewInit(): Promise<void> {
    if (!this.name || !this.isDisplay) return;

    const waterMarkDiv = this.renderer.createElement('div');
    const waterMarkImg = this.getWaterMarkImageUrl();
    const waterMarkDivStyle = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0.13;
      z-index: 1005;
      background-image: url('${waterMarkImg}');
    `;
    this.renderer.setAttribute(waterMarkDiv, 'style', waterMarkDivStyle);
    this.renderer.appendChild(this.el.nativeElement, waterMarkDiv);

  }

  private getWaterMarkImageUrl(): string {
    const canvas = this.renderer.createElement('canvas');
    canvas.setAttribute('width', '250px');
    canvas.setAttribute('height', '150px');

    const ctx = canvas.getContext('2d');
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = '12px PingFangSC-Regular, PingFang SC';
    ctx.fillStyle = '#54627B';
    ctx.rotate(10 * Math.PI / 180);
    const strArr = [`${this.name} ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`];
    strArr.forEach((str, i) => {
      ctx.fillText(str, 40, 70 + i * 15);
    });

    return canvas.toDataURL();
  }
}
