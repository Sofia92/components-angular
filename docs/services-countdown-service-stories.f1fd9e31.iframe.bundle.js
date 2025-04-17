(self.webpackChunkcomponents_angular=self.webpackChunkcomponents_angular||[]).push([[583],{"./stories/services/countdown.service.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>services_countdown_service_stories});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),countdown_service_stories=__webpack_require__("./stories/services/countdown.service.stories.ts.scss?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgICAgLmNvdW50ZG93bi1jb250YWluZXIgewogICAgICAgICAgICBwYWRkaW5nOiAyMHB4OwogICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjsKICAgICAgICB9CiAgICAgICAgLmNvdW50ZG93bi1kaXNwbGF5IHsKICAgICAgICAgICAgZm9udC1zaXplOiA0OHB4OwogICAgICAgICAgICBtYXJnaW46IDIwcHg7CiAgICAgICAgICAgIGNvbG9yOiAjMjE5NkYzOwogICAgICAgIH0KICAgICAgICAuc3RhdHVzIHsKICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4OwogICAgICAgICAgICBtYXJnaW46IDEwcHg7CiAgICAgICAgICAgIGNvbG9yOiAjNjY2OwogICAgICAgIH0KICAgIA%3D%3D!./stories/services/countdown.service.stories.ts"),countdown_service_stories_default=__webpack_require__.n(countdown_service_stories),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),ng_zorro_antd_modal=__webpack_require__("./node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-modal.mjs"),ng_zorro_antd_i18n=__webpack_require__("./node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-i18n.mjs");let MyModalService=class MyModalService{_nzModal;_nzI18nService;constructor(_nzModal,_nzI18nService){this._nzModal=_nzModal,this._nzI18nService=_nzI18nService}create(tplTitle,tplContent,nzComponentParams={},functions,modalOptions){const[disabledSubmit,submitCallback]=functions,_modal=this._nzModal.create({nzTitle:tplTitle,nzContent:tplContent,nzMaskClosable:!1,nzClosable:!1,nzAutofocus:!1,...modalOptions,nzComponentParams,nzFooter:modalOptions&&"nzFooter"in modalOptions?modalOptions.nzFooter:[{label:this._nzI18nService.translate("Modal.cancelText"),onClick:()=>{_modal.destroy(!1)}},{label:this._nzI18nService.translate("Modal.okText"),type:"primary",disabled:disabledSubmit||!1,onClick:(_ref=(0,asyncToGenerator.A)((function*(){submitCallback?(_modal.updateConfig({nzOkLoading:!0}),(yield submitCallback())&&(_modal.updateConfig({nzOkLoading:!1}),_modal.destroy(!0))):_modal.destroy(!0)})),function onClick(){return _ref.apply(this,arguments)})}]});var _ref;return _modal}confirm(nzTitle,nzContent){return new Promise((resolve=>this._nzModal.confirm({nzTitle,nzContent,nzOkDanger:!0,nzOnCancel:()=>resolve(!1),nzOnOk:()=>resolve(!0)})))}static ctorParameters=()=>[{type:ng_zorro_antd_modal.N_},{type:ng_zorro_antd_i18n.Og}]};MyModalService=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"})],MyModalService);var BehaviorSubject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js"),timer=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/timer.js"),take=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/take.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js");let CountdownService=class CountdownService{countdownSubject=new BehaviorSubject.t("");timerSubscription;pauseSubject=new BehaviorSubject.t(!1);remainingTime=0;countdown$=this.countdownSubject.asObservable();isPaused$=this.pauseSubject.asObservable();constructor(){}startCountdown(duration=5){this.cleanup(),this.remainingTime=duration,this.startTimer(duration)}pauseCountdown(){this.timerSubscription&&!this.pauseSubject.value&&(this.pauseSubject.next(!0),this.timerSubscription.unsubscribe())}resumeCountdown(){this.pauseSubject.value&&(this.pauseSubject.next(!1),this.startTimer(this.remainingTime)),this.timerSubscription||this.startTimer(this.remainingTime)}startTimer(duration){this.timerSubscription=(0,timer.O)(0,1e3).pipe((0,take.s)(duration+2),(0,map.T)((value=>{const remaining=duration-value;return this.remainingTime=remaining,`${remaining}s`}))).subscribe({next:text=>{this.countdownSubject.next(text)},complete:()=>{this.countdownSubject.next(""),this.cleanup()},error:error=>{console.error("Countdown error:",error),this.cleanup()}})}stopCountdown(){this.cleanup(),this.countdownSubject.next(""),this.pauseSubject.next(!1),this.remainingTime=0}cleanup(){this.timerSubscription&&(this.timerSubscription.unsubscribe(),this.timerSubscription=void 0)}ngOnDestroy(){this.cleanup()}static ctorParameters=()=>[]};CountdownService=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"})],CountdownService);var common_module_CBrzkrmd=__webpack_require__("./node_modules/@angular/common/fesm2022/common_module-CBrzkrmd.mjs"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),ng_zorro_antd_button=__webpack_require__("./node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-button.mjs");let CountdownDemoComponent=class CountdownDemoComponent{countdownService;duration;countdown$;isPaused$;constructor(countdownService){this.countdownService=countdownService,this.countdown$=this.countdownService.countdown$,this.isPaused$=this.countdownService.isPaused$}ngOnInit(){this.duration&&this.startCountdown(this.duration)}startCountdown(duration){this.countdownService.startCountdown(duration||this.duration)}pauseCountdown(){this.countdownService.pauseCountdown()}resumeCountdown(){this.countdownService.resumeCountdown()}stopCountdown(){this.countdownService.stopCountdown()}ngOnDestroy(){this.countdownService.stopCountdown()}static ctorParameters=()=>[{type:CountdownService}];static propDecorators={duration:[{type:core.Input}]}};CountdownDemoComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"app-countdown-demo",template:'\n        <div class="countdown-container">\n            <h2>Countdown Demo</h2>\n            <div class="flex gap-sm">\n                <button nz-button nzType="primary" (click)="startCountdown()">Start Countdown</button>\n                <button nz-button nzType="primary" (click)="pauseCountdown()">Pause</button>\n                <button nz-button nzType="primary" (click)="resumeCountdown()">Resume</button>\n                <button nz-button nzType="primary" (click)="stopCountdown()">Stop</button>\n            </div>\n            <div class="countdown-display" *ngIf="countdown$ | async as countdown">\n                {{ countdown }}\n            </div>\n            <div class="status" *ngIf="isPaused$ | async as isPaused">\n                {{ isPaused ? \'Paused\' : \'Running\' }}\n            </div>\n        </div>\n    ',imports:[common_module_CBrzkrmd.MD,ng_zorro_antd_button.Zw],styles:[countdown_service_stories_default()]})],CountdownDemoComponent);const services_countdown_service_stories={title:"Services/CountdownService",component:CountdownDemoComponent,decorators:[(0,dist.moduleMetadata)({imports:[common_module_CBrzkrmd.MD,ng_zorro_antd_button.Zw]})]},Default={args:{duration:10}},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    duration: 10\n  }\n}",...Default.parameters?.docs?.source}}}},"./stories/services/countdown.service.stories.ts.scss?ngResource!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICAgICAgLmNvdW50ZG93bi1jb250YWluZXIgewogICAgICAgICAgICBwYWRkaW5nOiAyMHB4OwogICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjsKICAgICAgICB9CiAgICAgICAgLmNvdW50ZG93bi1kaXNwbGF5IHsKICAgICAgICAgICAgZm9udC1zaXplOiA0OHB4OwogICAgICAgICAgICBtYXJnaW46IDIwcHg7CiAgICAgICAgICAgIGNvbG9yOiAjMjE5NkYzOwogICAgICAgIH0KICAgICAgICAuc3RhdHVzIHsKICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4OwogICAgICAgICAgICBtYXJnaW46IDEwcHg7CiAgICAgICAgICAgIGNvbG9yOiAjNjY2OwogICAgICAgIH0KICAgIA%3D%3D!./stories/services/countdown.service.stories.ts":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".countdown-container {\n  padding: 20px;\n  text-align: center;\n  font-family: Arial, sans-serif;\n}\n\n.countdown-display {\n  font-size: 48px;\n  margin: 20px;\n  color: #2196F3;\n}\n\n.status {\n  font-size: 24px;\n  margin: 10px;\n  color: #666;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);