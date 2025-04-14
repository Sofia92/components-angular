import { Pipe, PipeTransform } from '@angular/core';

const kb = 1024;
const mb = 1024 * kb;
const gb = 1024 * mb;

@Pipe({
  name: 'fileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {

  public transform(size: number): string {
    if(!size){
      return `0K`;
    }
    if (size < kb) {
      return `${size}B`;
    }
    if (size >= kb && size < mb) {
      return `${(size / kb).toFixed(2)}K`;
    }
    if (size >= mb && size <= gb) {
      return `${(size / mb).toFixed(2)}M`;
    }
    if (size >= gb) {
      return `${(size / gb).toFixed(2)}G`;
    }
    return '';
  }

}
