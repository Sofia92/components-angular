import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber',
  standalone: true
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: number, decimals: number = 1): string {
    if (value === null || value === undefined) return '0';
    
    if (value >= 1000000000) {
      const num = value / 1000000000;
      return this.formatWithDecimals(num, decimals) + 'B';
    }
    
    if (value >= 1000000) {
      const num = value / 1000000;
      return this.formatWithDecimals(num, decimals) + 'M';
    }
    
    if (value >= 1000) {
      const num = value / 1000;
      return this.formatWithDecimals(num, decimals) + 'K';
    }
    
    return value.toString();
  }

  private formatWithDecimals(num: number, decimals: number): string {
    const rounded = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(decimals);
  }
} 