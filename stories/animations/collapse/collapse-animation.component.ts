import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { COLLAPSE_ANIMATION } from '@Animations';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'animation-collapse',
  template: `
    <div class="demo-container">
      <button 
        class="trigger-button"
        (click)="toggleContent()">
        <span class="button-text">{{ isExpanded ? '收起' : '展开' }}</span>
        <span class="button-icon" [class.expanded]="isExpanded">▼</span>
      </button>
      
      <div 
        class="content-box"
        [class.expanded]="isExpanded"
        [@collapse]="isExpanded ? 'yes' : 'no'">
        <div class="content">
          <ng-container *ngIf="isExpanded">
            <ng-content></ng-content>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      width: 300px;
      padding: 20px;
    }
    .trigger-button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 12px 20px;
      background: #2196F3;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      margin-bottom: 16px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(33, 150, 243, 0.3);
    }
    .trigger-button:hover {
      background: #1976D2;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(33, 150, 243, 0.4);
    }
    .trigger-button:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(33, 150, 243, 0.3);
    }
    .button-text {
      font-weight: 500;
    }
    .button-icon {
      transition: transform 0.3s ease;
      font-size: 12px;
    }
    .button-icon.expanded {
      transform: rotate(180deg);
    }
    .content-box.expanded {
      background: #f8f9fa;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .content {
      padding: 20px;
    }
  `],
  animations: [COLLAPSE_ANIMATION],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CollapseAnimationComponent {
  isExpanded = false;
  toggleContent() {
    this.isExpanded = !this.isExpanded;
  }

  onAnimationDone(event: AnimationEvent) {
    console.log('动画完成', event);
  }
} 