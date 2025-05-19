import type { Meta, StoryObj } from '@storybook/angular';
import { CollapseAnimationComponent } from './collapse-animation.component';

const meta: Meta<CollapseAnimationComponent> = {
  title: 'Animations/Collapse',
  component: CollapseAnimationComponent
};

export default meta;
type Story = StoryObj<CollapseAnimationComponent>;

/**
 * 基础示例：展示展开/收起动画的基本用法
 * - 点击按钮触发动画
 * - 内容区域从60px高度展开到自适应高度
 * - 再次点击收起内容
 */
export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `
      <animation-collapse>
        <div class="content-wrapper">
          <h3>展开内容标题</h3>
          <p>这是展开的内容区域，展示了平滑的展开/收起动画效果。</p>
          <p>动画包含了高度、透明度和缩放的变化，使过渡更加自然。</p>
          <div class="feature-list">
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>平滑的高度过渡</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>透明度渐变效果</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>缩放动画</span>
            </div>
          </div>
        </div>
      </animation-collapse>
    `,
    styles: [`
      .content-wrapper {
        color: #333;
      }
      h3 {
        margin: 0 0 16px 0;
        color: #1976D2;
      }
      p {
        margin: 0 0 12px 0;
        line-height: 1.5;
      }
      .feature-list {
        margin-top: 16px;
      }
      .feature-item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
      .feature-icon {
        color: #4CAF50;
        margin-right: 8px;
        font-weight: bold;
      }
    `]
  })
};

/**
 * 带边框示例：展示带有边框样式的展开/收起动画
 * - 添加了边框和阴影效果
 * - 更好的视觉层次感
 */
export const WithBorder: Story = {
  render: (args) => ({
    props: args,
    template: `
      <animation-collapse>
        <div class="content-wrapper bordered">
          <h3>带边框的展开内容</h3>
          <p>这个示例展示了带有边框和阴影效果的展开内容。</p>
          <p>通过添加视觉层次，使界面更加精致。</p>
          <div class="info-box">
            <div class="info-item">
              <span class="info-label">动画时长：</span>
              <span class="info-value">300ms</span>
            </div>
            <div class="info-item">
              <span class="info-label">动画曲线：</span>
              <span class="info-value">cubic-bezier(0.4, 0, 0.2, 1)</span>
            </div>
            <div class="info-item">
              <span class="info-label">初始高度：</span>
              <span class="info-value">60px</span>
            </div>
          </div>
        </div>
      </animation-collapse>
    `,
    styles: [`
      .content-wrapper {
        color: #333;
      }
      .content-wrapper.bordered {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      h3 {
        margin: 0 0 16px 0;
        color: #1976D2;
      }
      p {
        margin: 0 0 12px 0;
        line-height: 1.5;
      }
      .info-box {
        margin-top: 16px;
        padding: 12px;
        background: #f8f9fa;
        border-radius: 4px;
      }
      .info-item {
        display: flex;
        margin-bottom: 8px;
      }
      .info-item:last-child {
        margin-bottom: 0;
      }
      .info-label {
        color: #666;
        width: 100px;
      }
      .info-value {
        color: #1976D2;
        font-family: monospace;
      }
    `]
  })
}; 