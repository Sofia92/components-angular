import { Pipe, PipeTransform } from "@angular/core";
import { NzI18nService } from "ng-zorro-antd/i18n";

@Pipe({
    name: 'translate',
    pure: false
})
export class TranslatePipe implements PipeTransform {
    private value: any;
    private path: string;
    private lastResult: string;

    constructor(private i18n: NzI18nService) {
        this.i18n.localeChange.subscribe(() => {
            if (this.path?.trim()) {
                this.lastResult = this.i18n.translate(this.path);
            }
        });
    }

    transform(value: any, ...args: any[]): string {
        this.path = args[0];
        this.value = value;

        // 如果提供了翻译路径，直接使用翻译路径进行翻译
        if (this.path?.trim()) {
            this.lastResult = this.i18n.translate(this.path);
            return this.lastResult;
        }

        // 如果没有提供翻译路径，但提供了值，尝试直接翻译该值
        if (value?.trim()) {
            this.lastResult = this.i18n.translate(value);
            return this.lastResult;
        }

        // 如果都没有，返回空字符串
        return '';
    }
} 