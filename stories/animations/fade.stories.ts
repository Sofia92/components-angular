import { type Meta, type StoryObj } from '@storybook/angular';
import { FADE_ANIMATION } from '@Animations';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'fade-demo',
  template: `
    <div style="margin-bottom: 16px;">
      <button nz-button nzType="primary" (click)="toggle()">Toggle ({{animationState}})</button>
    </div>
    <div [@fade]="animationState" style="padding: 40px; background: #f6f8fa; border-radius: 8px; box-shadow: 0 2px 8px #0001;">
      <h2>Content Area</h2>
      <p>This is a sample content area where the watermark will be displayed.</p>
    </div>
  `,
  animations: [FADE_ANIMATION],
  imports: [CommonModule, NzButtonModule]
})
class FadeDemoComponent {
  animationState = 'fadeOut';

  toggle() {
    this.animationState = this.animationState === 'fadeIn' ? 'fadeOut' : 'fadeIn';
    console.log('Animation state:', this.animationState);
  }
}

const meta: Meta<FadeDemoComponent> = {
  title: 'Animations/Fade',
  component: FadeDemoComponent
};

export default meta;

type Story = StoryObj<FadeDemoComponent>;

export const Default: Story = {};

