import {
  animate, style, transition, trigger, keyframes, AnimationTriggerMetadata,
  state,
} from '@angular/animations';

/**
 * 折叠动画
 */
export const COLLAPSE_ANIMATION: AnimationTriggerMetadata = trigger('collapse', [
  transition('no => yes, void => yes', [
    animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', keyframes([
      style({
        height: '60px',
        opacity: 0.5,
        transform: 'scale(0.95)',
        overflow: 'hidden',
      }),
      style({
        height: '*',
        opacity: 1,
        transform: 'scale(1)',
        overflow: 'hidden',
      }),
    ])),
  ]),
  transition('yes => no', [
    animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', keyframes([
      style({
        height: '*',
        opacity: 1,
        transform: 'scale(1)',
        overflow: 'hidden',
      }),
      style({
        opacity: 0.5,
        transform: 'scale(0.95)',
        overflow: 'hidden',
      }),
    ])),
  ]),
]);
/**
 * 淡入淡出动画
 */
export const FADE_ANIMATION: AnimationTriggerMetadata = trigger('fade', [
  state('fadeOut, void', style({ 
    opacity: 0,
    transform: 'translateY(20px) scale(0.95)'
  })),
  state('fadeIn', style({ 
    opacity: 1,
    transform: 'translateY(0) scale(1)'
  })),
  transition('* <=> fadeIn', animate('800ms cubic-bezier(0.4, 0, 0.2, 1)')),
])