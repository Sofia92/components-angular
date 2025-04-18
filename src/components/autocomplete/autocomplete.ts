import { CommonModule } from '@angular/common';
import {
    NgZone, Component, Input, Output, HostBinding, EventEmitter, forwardRef, HostListener, ElementRef
} from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: '[LibAutocomplete]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LibAutocompleteComponent),
            multi: true,
        },
    ],
    template: `
    <input type="text"
           [placeholder]="placeholder"
           (compositionstart)="isComposition = true; beforeValue = currentValue;"
           (compositionend)="handleComposition($event)"
           (focus)="actived=true"
           [value]="currentValue"
           (input)="handleInput($event.target.value)"
    />
    <div class="suggestion-list" [class.actived]="actived" style="max-height: 200px;overflow: auto;z-index:11"
         *ngIf="suggestions.length">
      <ul class="vertical suggestions">
        <li [class.disabled]="true" *ngIf="loading">
        <i sds-icon nzType="loading"></i>
        </li>
        <li *ngFor="let suggestion of suggestions; let i = index"
            class="suggestion"
            [ngClass]="{'selected-item': currentValue===suggestion}"
            (click)="changeCurrentValue(suggestion, true, i); actived = false">
            <ng-container *ngIf="!isCustom">
                <span>{{suggestion}}</span>
                <span *ngIf="subSuggestions[i]" class="sub-suggestion">{{subSuggestions[i]}}</span>
                <span *ngIf="tips[i]" class="tip">「{{tips[i]}}」</span>
            </ng-container>
            <ng-container *ngIf="isCustom">
                <span class="sub-suggestion">{{subSuggestions[i]}}</span>
                <span *ngIf="tips[i]" class="tip">「{{tips[i]}}」</span>
            </ng-container>
        </li>
      </ul>
    </div>
  `,
  imports: [CommonModule, FormsModule],
})
export class LibAutocompleteComponent implements ControlValueAccessor {
    public isComposition = false; // fix中文输入法触发
    public currentValue: any;
    public actived = false;
    public isUsingZh: boolean;
    public beforeValue = '';

    @Input() public isCustom = false;
    @Input() public loading = false;
    @Input() public suggestions: string[] = [];
    @Input() public subSuggestions: string[] = [];
    @Input() public tips: string[] = [];
    @Input() public placeholder = '';
    @Input() public selectedValue: string;
    @Output() public changeEmitter = new EventEmitter();
    @Output() public changeClickEmitter = new EventEmitter();

    @HostBinding('class.lib-autocomplete')
    public classSelector = true;

    constructor(
        private eleRef: ElementRef, private zone: NgZone) {

    }

    public changeCurrentValue(suggestion: any, isClick: boolean = false, i?: number): void {
        this.currentValue = suggestion;
        this.changeEmitter.emit(this.currentValue);
        if (this.isCustom && i !== undefined) {
            this.changeEmitter.emit(this.subSuggestions[i]);
            if (isClick) {
                this.changeClickEmitter.emit(this.subSuggestions[i]);
            }
        } else {
            this.changeEmitter.emit(this.currentValue);
            if (isClick) {
                this.changeClickEmitter.emit(this.currentValue);
            }
        }
        this.currentValueChange(this.currentValue);
        this.resetSuggestionScrollBar();
    }

    @HostListener('document:click', ['$event'])
    public setDisabledSuggestionList(event: any): void {
        if (!this.eleRef.nativeElement.contains(event.target)) {
            this.actived = false;
        }
    }

    public writeValue(v: any): void {
        if (v !== undefined) {
            this.currentValue = v;
        }
    }
    // tslint:disable-next-line:no-empty
    public currentValueChange = (_: any) => {
    }

    public registerOnChange(fn: any): void {
        this.currentValueChange = fn;
    }

    // tslint:disable-next-line:no-empty
    public registerOnTouched(fn: any): void {
    }

    public handleComposition($event: any): void {
        setTimeout(() => {
            this.changeCurrentValue($event.target.value);
            this.isComposition = false;
        }, 0);
    }

    public handleInput(value: any): void {
        this.actived = true;
        if (!this.isComposition) {
            this.changeCurrentValue(value);
        }
    }

    /**
     * 解决全选变量栏内的关键词, 切换关键词搜索滚动条还在上一次滚动的位置的bug
     * 手动将suggestion-list的滚动条重置回顶部位置
     */
    private resetSuggestionScrollBar(): void {
        const childrenList: any[] = Array.from(this.eleRef.nativeElement.children);
        const suggestionElement = childrenList.find((child) => child.className.includes('suggestion-list'));
        if (suggestionElement) {
            suggestionElement.scrollTop = 0;
        }
    }
}
