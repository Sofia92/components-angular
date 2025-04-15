import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslatePipe } from '@Pipes';
@Component({
  selector: 'app-search-tag',
  templateUrl: './search-tag.component.html',
  styles: [`
    :host{
      display: block;
      width: 100%;
      height: 28px;
      text-align: left;
      font-size: 14px;
    }
    .tag-group {
      min-width: 200px;
      max-width: 300px;
    }
    .tag-item {
      margin: 0;
    }
    .icon{
      color: #d9d9d9;
    }
    `],
  imports: [
    CommonModule, FormsModule,
    NzSelectModule, NzIconModule, NzDropDownModule, NzCheckboxModule,
    TranslatePipe,
  ]
})
export class SearchTagComponent {
  @Input() tagList: any[] = [];
  @Input() width: number = 150;
  @Input() tagIds: string[] = [];
  @Output() tagIdsChange = new EventEmitter<string[]>();
  checkSet = new Set<string>();

  constructor(private i18n: NzI18nService) { }

  get firstTag(): string {
    return this.checkSet.size > 0
      ? this.tagList.find(tag => this.checkSet.has(tag.id))?.name
      : this.i18n.translate('Role.CommandTagPlaceholder')
  }
  get tagsSurfix(): string {
    return this.checkSet.size > 1
      ? `+ ${this.checkSet.size - 1}`
      : '';
  }

  toggleCheckTag(tagId: string) {
    this.checkSet.has(tagId) ? this.checkSet.delete(tagId) : this.checkSet.add(tagId);
    this.tagIdsChange.emit([...this.checkSet]);
  }

  clearCheckTags() {
    this.checkSet.clear();
    this.tagIdsChange.emit([...this.checkSet]);
  }
}
