"use strict";(self.webpackChunkcomponents_angular=self.webpackChunkcomponents_angular||[]).push([[684],{"./node_modules/@angular/cdk/fesm2022/backwards-compatibility-c898f923.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_:()=>_bindEventWithOptions});var _angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");function _bindEventWithOptions(renderer,target,eventName,callback,options){const major=parseInt(_angular_core__WEBPACK_IMPORTED_MODULE_0__.VERSION.major),minor=parseInt(_angular_core__WEBPACK_IMPORTED_MODULE_0__.VERSION.minor);return major>19||19===major&&minor>0||0===major&&0===minor?renderer.listen(target,eventName,callback,options):(target.addEventListener(eventName,callback,options),()=>{target.removeEventListener(eventName,callback,options)})}},"./node_modules/@angular/cdk/fesm2022/element-bed495ef.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>coerceNumberProperty,c:()=>coerceElement});var _angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");function coerceNumberProperty(value,fallbackValue=0){return function _isNumberValue(value){return!isNaN(parseFloat(value))&&!isNaN(Number(value))}(value)?Number(value):2===arguments.length?fallbackValue:0}function coerceElement(elementOrRef){return elementOrRef instanceof _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef?elementOrRef.nativeElement:elementOrRef}},"./node_modules/@angular/cdk/fesm2022/focus-monitor-9a0037cb.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>FocusMonitor});var core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),BehaviorSubject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js"),Subject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),of=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/of.js"),skip=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/skip.js"),distinctUntilChanged=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js"),takeUntil=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js"),dom_tokens_rA0ACyx7=__webpack_require__("./node_modules/@angular/common/fesm2022/dom_tokens-rA0ACyx7.mjs");var keycodes_fbdb6e67=__webpack_require__("./node_modules/@angular/cdk/fesm2022/keycodes-fbdb6e67.mjs"),shadow_dom_09da63d7=__webpack_require__("./node_modules/@angular/cdk/fesm2022/shadow-dom-09da63d7.mjs"),backwards_compatibility_c898f923=__webpack_require__("./node_modules/@angular/cdk/fesm2022/backwards-compatibility-c898f923.mjs"),platform_666e117b=__webpack_require__("./node_modules/@angular/cdk/fesm2022/platform-666e117b.mjs");let supportsPassiveEvents;var element_bed495ef=__webpack_require__("./node_modules/@angular/cdk/fesm2022/element-bed495ef.mjs");const INPUT_MODALITY_DETECTOR_OPTIONS=new core.InjectionToken("cdk-input-modality-detector-options"),INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS={ignoreKeys:[keycodes_fbdb6e67.A,keycodes_fbdb6e67.C,keycodes_fbdb6e67.M,keycodes_fbdb6e67.a,keycodes_fbdb6e67.S]},modalityEventListenerOptions={passive:!0,capture:!0};class InputModalityDetector{_platform=(0,core.inject)(platform_666e117b.P);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new BehaviorSubject.t(null);_options;_lastTouchMs=0;_onKeydown=event=>{this._options?.ignoreKeys?.some((keyCode=>keyCode===event.keyCode))||(this._modality.next("keyboard"),this._mostRecentTarget=(0,shadow_dom_09da63d7._)(event))};_onMousedown=event=>{Date.now()-this._lastTouchMs<650||(this._modality.next(function isFakeMousedownFromScreenReader(event){return 0===event.buttons||0===event.detail}(event)?"keyboard":"mouse"),this._mostRecentTarget=(0,shadow_dom_09da63d7._)(event))};_onTouchstart=event=>{!function isFakeTouchstartFromScreenReader(event){const touch=event.touches&&event.touches[0]||event.changedTouches&&event.changedTouches[0];return!(!touch||-1!==touch.identifier||null!=touch.radiusX&&1!==touch.radiusX||null!=touch.radiusY&&1!==touch.radiusY)}(event)?(this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=(0,shadow_dom_09da63d7._)(event)):this._modality.next("keyboard")};constructor(){const ngZone=(0,core.inject)(core.NgZone),document=(0,core.inject)(dom_tokens_rA0ACyx7.q),options=(0,core.inject)(INPUT_MODALITY_DETECTOR_OPTIONS,{optional:!0});if(this._options={...INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS,...options},this.modalityDetected=this._modality.pipe((0,skip.i)(1)),this.modalityChanged=this.modalityDetected.pipe((0,distinctUntilChanged.F)()),this._platform.isBrowser){const renderer=(0,core.inject)(core.RendererFactory2).createRenderer(null,null);this._listenerCleanups=ngZone.runOutsideAngular((()=>[(0,backwards_compatibility_c898f923._)(renderer,document,"keydown",this._onKeydown,modalityEventListenerOptions),(0,backwards_compatibility_c898f923._)(renderer,document,"mousedown",this._onMousedown,modalityEventListenerOptions),(0,backwards_compatibility_c898f923._)(renderer,document,"touchstart",this._onTouchstart,modalityEventListenerOptions)]))}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach((cleanup=>cleanup()))}static ɵfac=function InputModalityDetector_Factory(__ngFactoryType__){return new(__ngFactoryType__||InputModalityDetector)};static ɵprov=core["ɵɵdefineInjectable"]({token:InputModalityDetector,factory:InputModalityDetector.ɵfac,providedIn:"root"})}var FocusMonitorDetectionMode;("undefined"==typeof ngDevMode||ngDevMode)&&core["ɵsetClassMetadata"](InputModalityDetector,[{type:core.Injectable,args:[{providedIn:"root"}]}],(()=>[]),null),function(FocusMonitorDetectionMode){FocusMonitorDetectionMode[FocusMonitorDetectionMode.IMMEDIATE=0]="IMMEDIATE",FocusMonitorDetectionMode[FocusMonitorDetectionMode.EVENTUAL=1]="EVENTUAL"}(FocusMonitorDetectionMode||(FocusMonitorDetectionMode={}));const FOCUS_MONITOR_DEFAULT_OPTIONS=new core.InjectionToken("cdk-focus-monitor-default-options"),captureEventListenerOptions=function normalizePassiveListenerOptions(options){return function supportsPassiveEventListeners(){if(null==supportsPassiveEvents&&"undefined"!=typeof window)try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>supportsPassiveEvents=!0}))}finally{supportsPassiveEvents=supportsPassiveEvents||!1}return supportsPassiveEvents}()?options:!!options.capture}({passive:!0,capture:!0});class FocusMonitor{_ngZone=(0,core.inject)(core.NgZone);_platform=(0,core.inject)(platform_666e117b.P);_inputModalityDetector=(0,core.inject)(InputModalityDetector);_origin=null;_lastFocusOrigin;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout((()=>this._windowFocused=!1))};_document=(0,core.inject)(dom_tokens_rA0ACyx7.q,{optional:!0});_stopInputModalityDetector=new Subject.B;constructor(){const options=(0,core.inject)(FOCUS_MONITOR_DEFAULT_OPTIONS,{optional:!0});this._detectionMode=options?.detectionMode||FocusMonitorDetectionMode.IMMEDIATE}_rootNodeFocusAndBlurListener=event=>{for(let element=(0,shadow_dom_09da63d7._)(event);element;element=element.parentElement)"focus"===event.type?this._onFocus(event,element):this._onBlur(event,element)};monitor(element,checkChildren=!1){const nativeElement=(0,element_bed495ef.c)(element);if(!this._platform.isBrowser||1!==nativeElement.nodeType)return(0,of.of)();const rootNode=(0,shadow_dom_09da63d7.a)(nativeElement)||this._getDocument(),cachedInfo=this._elementInfo.get(nativeElement);if(cachedInfo)return checkChildren&&(cachedInfo.checkChildren=!0),cachedInfo.subject;const info={checkChildren,subject:new Subject.B,rootNode};return this._elementInfo.set(nativeElement,info),this._registerGlobalListeners(info),info.subject}stopMonitoring(element){const nativeElement=(0,element_bed495ef.c)(element),elementInfo=this._elementInfo.get(nativeElement);elementInfo&&(elementInfo.subject.complete(),this._setClasses(nativeElement),this._elementInfo.delete(nativeElement),this._removeGlobalListeners(elementInfo))}focusVia(element,origin,options){const nativeElement=(0,element_bed495ef.c)(element);nativeElement===this._getDocument().activeElement?this._getClosestElementsInfo(nativeElement).forEach((([currentElement,info])=>this._originChanged(currentElement,origin,info))):(this._setOrigin(origin),"function"==typeof nativeElement.focus&&nativeElement.focus(options))}ngOnDestroy(){this._elementInfo.forEach(((_info,element)=>this.stopMonitoring(element)))}_getDocument(){return this._document||document}_getWindow(){return this._getDocument().defaultView||window}_getFocusOrigin(focusEventTarget){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(focusEventTarget)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:focusEventTarget&&this._isLastInteractionFromInputLabel(focusEventTarget)?"mouse":"program"}_shouldBeAttributedToTouch(focusEventTarget){return this._detectionMode===FocusMonitorDetectionMode.EVENTUAL||!!focusEventTarget?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(element,origin){element.classList.toggle("cdk-focused",!!origin),element.classList.toggle("cdk-touch-focused","touch"===origin),element.classList.toggle("cdk-keyboard-focused","keyboard"===origin),element.classList.toggle("cdk-mouse-focused","mouse"===origin),element.classList.toggle("cdk-program-focused","program"===origin)}_setOrigin(origin,isFromInteraction=!1){this._ngZone.runOutsideAngular((()=>{if(this._origin=origin,this._originFromTouchInteraction="touch"===origin&&isFromInteraction,this._detectionMode===FocusMonitorDetectionMode.IMMEDIATE){clearTimeout(this._originTimeoutId);const ms=this._originFromTouchInteraction?650:1;this._originTimeoutId=setTimeout((()=>this._origin=null),ms)}}))}_onFocus(event,element){const elementInfo=this._elementInfo.get(element),focusEventTarget=(0,shadow_dom_09da63d7._)(event);elementInfo&&(elementInfo.checkChildren||element===focusEventTarget)&&this._originChanged(element,this._getFocusOrigin(focusEventTarget),elementInfo)}_onBlur(event,element){const elementInfo=this._elementInfo.get(element);!elementInfo||elementInfo.checkChildren&&event.relatedTarget instanceof Node&&element.contains(event.relatedTarget)||(this._setClasses(element),this._emitOrigin(elementInfo,null))}_emitOrigin(info,origin){info.subject.observers.length&&this._ngZone.run((()=>info.subject.next(origin)))}_registerGlobalListeners(elementInfo){if(!this._platform.isBrowser)return;const rootNode=elementInfo.rootNode,rootNodeFocusListeners=this._rootNodeFocusListenerCount.get(rootNode)||0;rootNodeFocusListeners||this._ngZone.runOutsideAngular((()=>{rootNode.addEventListener("focus",this._rootNodeFocusAndBlurListener,captureEventListenerOptions),rootNode.addEventListener("blur",this._rootNodeFocusAndBlurListener,captureEventListenerOptions)})),this._rootNodeFocusListenerCount.set(rootNode,rootNodeFocusListeners+1),1==++this._monitoredElementCount&&(this._ngZone.runOutsideAngular((()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)})),this._inputModalityDetector.modalityDetected.pipe((0,takeUntil.Q)(this._stopInputModalityDetector)).subscribe((modality=>{this._setOrigin(modality,!0)})))}_removeGlobalListeners(elementInfo){const rootNode=elementInfo.rootNode;if(this._rootNodeFocusListenerCount.has(rootNode)){const rootNodeFocusListeners=this._rootNodeFocusListenerCount.get(rootNode);rootNodeFocusListeners>1?this._rootNodeFocusListenerCount.set(rootNode,rootNodeFocusListeners-1):(rootNode.removeEventListener("focus",this._rootNodeFocusAndBlurListener,captureEventListenerOptions),rootNode.removeEventListener("blur",this._rootNodeFocusAndBlurListener,captureEventListenerOptions),this._rootNodeFocusListenerCount.delete(rootNode))}if(! --this._monitoredElementCount){this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId)}}_originChanged(element,origin,elementInfo){this._setClasses(element,origin),this._emitOrigin(elementInfo,origin),this._lastFocusOrigin=origin}_getClosestElementsInfo(element){const results=[];return this._elementInfo.forEach(((info,currentElement)=>{(currentElement===element||info.checkChildren&&currentElement.contains(element))&&results.push([currentElement,info])})),results}_isLastInteractionFromInputLabel(focusEventTarget){const{_mostRecentTarget:mostRecentTarget,mostRecentModality}=this._inputModalityDetector;if("mouse"!==mostRecentModality||!mostRecentTarget||mostRecentTarget===focusEventTarget||"INPUT"!==focusEventTarget.nodeName&&"TEXTAREA"!==focusEventTarget.nodeName||focusEventTarget.disabled)return!1;const labels=focusEventTarget.labels;if(labels)for(let i=0;i<labels.length;i++)if(labels[i].contains(mostRecentTarget))return!0;return!1}static ɵfac=function FocusMonitor_Factory(__ngFactoryType__){return new(__ngFactoryType__||FocusMonitor)};static ɵprov=core["ɵɵdefineInjectable"]({token:FocusMonitor,factory:FocusMonitor.ɵfac,providedIn:"root"})}("undefined"==typeof ngDevMode||ngDevMode)&&core["ɵsetClassMetadata"](FocusMonitor,[{type:core.Injectable,args:[{providedIn:"root"}]}],(()=>[]),null);class CdkMonitorFocus{_elementRef=(0,core.inject)(core.ElementRef);_focusMonitor=(0,core.inject)(FocusMonitor);_monitorSubscription;_focusOrigin=null;cdkFocusChange=new core.EventEmitter;constructor(){}get focusOrigin(){return this._focusOrigin}ngAfterViewInit(){const element=this._elementRef.nativeElement;this._monitorSubscription=this._focusMonitor.monitor(element,1===element.nodeType&&element.hasAttribute("cdkMonitorSubtreeFocus")).subscribe((origin=>{this._focusOrigin=origin,this.cdkFocusChange.emit(origin)}))}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._monitorSubscription&&this._monitorSubscription.unsubscribe()}static ɵfac=function CdkMonitorFocus_Factory(__ngFactoryType__){return new(__ngFactoryType__||CdkMonitorFocus)};static ɵdir=core["ɵɵdefineDirective"]({type:CdkMonitorFocus,selectors:[["","cdkMonitorElementFocus",""],["","cdkMonitorSubtreeFocus",""]],outputs:{cdkFocusChange:"cdkFocusChange"},exportAs:["cdkMonitorFocus"]})}("undefined"==typeof ngDevMode||ngDevMode)&&core["ɵsetClassMetadata"](CdkMonitorFocus,[{type:core.Directive,args:[{selector:"[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]",exportAs:"cdkMonitorFocus"}]}],(()=>[]),{cdkFocusChange:[{type:core.Output}]})},"./node_modules/@angular/cdk/fesm2022/keycodes-fbdb6e67.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ALT,B:()=>BACKSPACE,C:()=>CONTROL,D:()=>DOWN_ARROW,M:()=>MAC_META,S:()=>SHIFT,T:()=>TAB,U:()=>UP_ARROW,a:()=>META,e:()=>ESCAPE,h:()=>ENTER,k:()=>SPACE});const BACKSPACE=8,TAB=9,ENTER=13,SHIFT=16,CONTROL=17,ALT=18,ESCAPE=27,SPACE=32,UP_ARROW=38,DOWN_ARROW=40,META=91,MAC_META=224},"./node_modules/@angular/cdk/fesm2022/shadow-dom-09da63d7.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{let shadowDomIsSupported;function _getShadowRoot(element){if(function _supportsShadowDom(){if(null==shadowDomIsSupported){const head="undefined"!=typeof document?document.head:null;shadowDomIsSupported=!(!head||!head.createShadowRoot&&!head.attachShadow)}return shadowDomIsSupported}()){const rootNode=element.getRootNode?element.getRootNode():null;if("undefined"!=typeof ShadowRoot&&ShadowRoot&&rootNode instanceof ShadowRoot)return rootNode}return null}function _getEventTarget(event){return event.composedPath?event.composedPath()[0]:event.target}__webpack_require__.d(__webpack_exports__,{_:()=>_getEventTarget,a:()=>_getShadowRoot})},"./node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-form.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Xd:()=>NzFormItemFeedbackIconComponent,is:()=>NzFormStatusService,n1:()=>NzFormNoStatusService});var _angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),rxjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/ReplaySubject.js"),rxjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js"),ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-icon.mjs");function NzFormItemFeedbackIconComponent_Conditional_0_Template(rf,ctx){if(1&rf&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0,"nz-icon",0),2&rf){const ctx_r0=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nzType",ctx_r0.iconType)}}class NzFormStatusService{formStatusChanges=new rxjs__WEBPACK_IMPORTED_MODULE_1__.m(1);static ɵfac=function NzFormStatusService_Factory(__ngFactoryType__){return new(__ngFactoryType__||NzFormStatusService)};static ɵprov=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({token:NzFormStatusService,factory:NzFormStatusService.ɵfac})}("undefined"==typeof ngDevMode||ngDevMode)&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NzFormStatusService,[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable}],null,null);class NzFormNoStatusService{noFormStatus=new rxjs__WEBPACK_IMPORTED_MODULE_2__.t(!1);static ɵfac=function NzFormNoStatusService_Factory(__ngFactoryType__){return new(__ngFactoryType__||NzFormNoStatusService)};static ɵprov=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({token:NzFormNoStatusService,factory:NzFormNoStatusService.ɵfac})}("undefined"==typeof ngDevMode||ngDevMode)&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NzFormNoStatusService,[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable}],null,null);const iconTypeMap={error:"close-circle-fill",validating:"loading",success:"check-circle-fill",warning:"exclamation-circle-fill"};class NzFormItemFeedbackIconComponent{cdr;status="";constructor(cdr){this.cdr=cdr}iconType=null;ngOnChanges(_changes){this.updateIcon()}updateIcon(){this.iconType=this.status?iconTypeMap[this.status]:null,this.cdr.markForCheck()}static ɵfac=function NzFormItemFeedbackIconComponent_Factory(__ngFactoryType__){return new(__ngFactoryType__||NzFormItemFeedbackIconComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef))};static ɵcmp=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({type:NzFormItemFeedbackIconComponent,selectors:[["nz-form-item-feedback-icon"]],hostAttrs:[1,"ant-form-item-feedback-icon"],hostVars:8,hostBindings:function NzFormItemFeedbackIconComponent_HostBindings(rf,ctx){2&rf&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("ant-form-item-feedback-icon-error","error"===ctx.status)("ant-form-item-feedback-icon-warning","warning"===ctx.status)("ant-form-item-feedback-icon-success","success"===ctx.status)("ant-form-item-feedback-icon-validating","validating"===ctx.status)},inputs:{status:"status"},exportAs:["nzFormFeedbackIcon"],features:[_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],decls:1,vars:1,consts:[[3,"nzType"]],template:function NzFormItemFeedbackIconComponent_Template(rf,ctx){1&rf&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0,NzFormItemFeedbackIconComponent_Conditional_0_Template,1,1,"nz-icon",0),2&rf&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵconditional"](ctx.iconType?0:-1)},dependencies:[ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_3__.Y3,ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_3__.Dn],encapsulation:2,changeDetection:0})}("undefined"==typeof ngDevMode||ngDevMode)&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NzFormItemFeedbackIconComponent,[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,args:[{selector:"nz-form-item-feedback-icon",exportAs:"nzFormFeedbackIcon",imports:[ng_zorro_antd_icon__WEBPACK_IMPORTED_MODULE_3__.Y3],preserveWhitespaces:!1,encapsulation:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,changeDetection:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,template:'\n    @if (iconType) {\n      <nz-icon [nzType]="iconType" />\n    }\n  ',host:{class:"ant-form-item-feedback-icon","[class.ant-form-item-feedback-icon-error]":'status==="error"',"[class.ant-form-item-feedback-icon-warning]":'status==="warning"',"[class.ant-form-item-feedback-icon-success]":'status==="success"',"[class.ant-form-item-feedback-icon-validating]":'status==="validating"'}}]}],(()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef}]),{status:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}]});class NzFormPatchModule{static ɵfac=function NzFormPatchModule_Factory(__ngFactoryType__){return new(__ngFactoryType__||NzFormPatchModule)};static ɵmod=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({type:NzFormPatchModule,imports:[NzFormItemFeedbackIconComponent],exports:[NzFormItemFeedbackIconComponent]});static ɵinj=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({imports:[NzFormItemFeedbackIconComponent]})}("undefined"==typeof ngDevMode||ngDevMode)&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NzFormPatchModule,[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,args:[{imports:[NzFormItemFeedbackIconComponent],exports:[NzFormItemFeedbackIconComponent]}]}],null,null)},"./node_modules/rxjs/dist/esm5/internal/ReplaySubject.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{m:()=>ReplaySubject});var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_Subject__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),_scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js"),ReplaySubject=function(_super){function ReplaySubject(_bufferSize,_windowTime,_timestampProvider){void 0===_bufferSize&&(_bufferSize=1/0),void 0===_windowTime&&(_windowTime=1/0),void 0===_timestampProvider&&(_timestampProvider=_scheduler_dateTimestampProvider__WEBPACK_IMPORTED_MODULE_1__.U);var _this=_super.call(this)||this;return _this._bufferSize=_bufferSize,_this._windowTime=_windowTime,_this._timestampProvider=_timestampProvider,_this._buffer=[],_this._infiniteTimeWindow=!0,_this._infiniteTimeWindow=_windowTime===1/0,_this._bufferSize=Math.max(1,_bufferSize),_this._windowTime=Math.max(1,_windowTime),_this}return(0,tslib__WEBPACK_IMPORTED_MODULE_0__.C6)(ReplaySubject,_super),ReplaySubject.prototype.next=function(value){var _a=this,isStopped=_a.isStopped,_buffer=_a._buffer,_infiniteTimeWindow=_a._infiniteTimeWindow,_timestampProvider=_a._timestampProvider,_windowTime=_a._windowTime;isStopped||(_buffer.push(value),!_infiniteTimeWindow&&_buffer.push(_timestampProvider.now()+_windowTime)),this._trimBuffer(),_super.prototype.next.call(this,value)},ReplaySubject.prototype._subscribe=function(subscriber){this._throwIfClosed(),this._trimBuffer();for(var subscription=this._innerSubscribe(subscriber),_infiniteTimeWindow=this._infiniteTimeWindow,copy=this._buffer.slice(),i=0;i<copy.length&&!subscriber.closed;i+=_infiniteTimeWindow?1:2)subscriber.next(copy[i]);return this._checkFinalizedStatuses(subscriber),subscription},ReplaySubject.prototype._trimBuffer=function(){var _bufferSize=this._bufferSize,_timestampProvider=this._timestampProvider,_buffer=this._buffer,_infiniteTimeWindow=this._infiniteTimeWindow,adjustedBufferSize=(_infiniteTimeWindow?1:2)*_bufferSize;if(_bufferSize<1/0&&adjustedBufferSize<_buffer.length&&_buffer.splice(0,_buffer.length-adjustedBufferSize),!_infiniteTimeWindow){for(var now=_timestampProvider.now(),last=0,i=1;i<_buffer.length&&_buffer[i]<=now;i+=2)last=i;last&&_buffer.splice(0,last+1)}},ReplaySubject}(_Subject__WEBPACK_IMPORTED_MODULE_2__.B)}}]);