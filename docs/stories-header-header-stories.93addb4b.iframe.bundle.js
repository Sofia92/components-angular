(self.webpackChunkcomponents_angular=self.webpackChunkcomponents_angular||[]).push([[954],{"./src/stories/header/header.css?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".storybook-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  padding: 15px 20px;\n  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n}\n\n.storybook-header svg {\n  display: inline-block;\n  vertical-align: top;\n}\n\n.storybook-header h1 {\n  display: inline-block;\n  vertical-align: top;\n  margin: 6px 0 6px 10px;\n  font-weight: 700;\n  font-size: 20px;\n  line-height: 1;\n}\n\n.storybook-header button + button {\n  margin-left: 10px;\n}\n\n.storybook-header .welcome {\n  margin-right: 10px;\n  color: #333;\n  font-size: 14px;\n}\n",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./src/stories/header/header.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{LoggedIn:()=>LoggedIn,LoggedOut:()=>LoggedOut,__namedExportsOrder:()=>__namedExportsOrder,default:()=>header_stories});var dist=__webpack_require__("./node_modules/@storybook/test/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),headerngResource=__webpack_require__("./src/stories/header/header.css?ngResource"),headerngResource_default=__webpack_require__.n(headerngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),common_module_CBrzkrmd=__webpack_require__("./node_modules/@angular/common/fesm2022/common_module-CBrzkrmd.mjs"),components=__webpack_require__("./src/components/index.ts");let HeaderComponent=class HeaderComponent{user=null;onLogin=new core.EventEmitter;onLogout=new core.EventEmitter;onCreateAccount=new core.EventEmitter;static propDecorators={user:[{type:core.Input}],onLogin:[{type:core.Output}],onLogout:[{type:core.Output}],onCreateAccount:[{type:core.Output}]}};HeaderComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"storybook-header",standalone:!0,imports:[common_module_CBrzkrmd.MD,components.Qp],template:'<header>\n  <div class="storybook-header">\n    <div>\n      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">\n        <g fill="none" fillRule="evenodd">\n          <path\n            d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"\n            fill="#FFF"\n          />\n          <path\n            d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"\n            fill="#555AB9"\n          />\n          <path d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z" fill="#91BAF8" />\n        </g>\n      </svg>\n      <h1>Acme</h1>\n    </div>\n    <div>\n      <div *ngIf="user">\n        <span class="welcome">\n          Welcome, <b>{{ user.name }}</b\n          >!\n        </span>\n        <storybook-button\n          *ngIf="user"\n          size="small"\n          (onClick)="onLogout.emit($event)"\n          label="Log out"\n        ></storybook-button>\n      </div>\n      <div *ngIf="!user">\n        <storybook-button\n          *ngIf="!user"\n          size="small"\n          class="margin-left"\n          (onClick)="onLogin.emit($event)"\n          label="Log in"\n        ></storybook-button>\n        <storybook-button\n          *ngIf="!user"\n          size="small"\n          [primary]="true"\n          class="margin-left"\n          (onClick)="onCreateAccount.emit($event)"\n          label="Sign up"\n        ></storybook-button>\n      </div>\n    </div>\n  </div>\n</header>',styles:[headerngResource_default()]})],HeaderComponent);const header_stories={title:"Example/Header",component:HeaderComponent,tags:["autodocs"],parameters:{layout:"fullscreen"},args:{onLogin:(0,dist.fn)(),onLogout:(0,dist.fn)(),onCreateAccount:(0,dist.fn)()}},LoggedIn={args:{user:{name:"Jane Doe"}}},LoggedOut={},__namedExportsOrder=["LoggedIn","LoggedOut"];LoggedIn.parameters={...LoggedIn.parameters,docs:{...LoggedIn.parameters?.docs,source:{originalSource:"{\n  args: {\n    user: {\n      name: 'Jane Doe'\n    }\n  }\n}",...LoggedIn.parameters?.docs?.source}}},LoggedOut.parameters={...LoggedOut.parameters,docs:{...LoggedOut.parameters?.docs,source:{originalSource:"{}",...LoggedOut.parameters?.docs?.source}}}}}]);