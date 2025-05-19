import {
  animate, style, transition, trigger, keyframes, AnimationTriggerMetadata,
} from '@angular/animations';

export const CELLOVERLAYANIMATION: AnimationTriggerMetadata = trigger('collapse', [
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
