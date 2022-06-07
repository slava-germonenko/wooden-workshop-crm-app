import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';

import { ColumnDescriptor } from './column-descriptor';
import { ActionsProvider } from './types';

@Component({
  selector: 'ww-table-list',
  templateUrl: 'table-list.component.html',
  styleUrls: ['table-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableListComponent {
  public selectionModel = new SelectionModel<unknown>(true);

  public allSelected = false;

  @Input()
  public columns: ColumnDescriptor<unknown>[] = [];

  @Input()
  public dataSource: unknown[] = [];

  @Input()
  public getEntryActions: ActionsProvider | null = null;

  @Input()
  public selectEnabled = false;

  @Input()
  public length = 0;

  @Input()
  public loading = false;

  @Output()
  public selectionChange = new EventEmitter<unknown[]>();

  @Output()
  public loadMoreClick = new EventEmitter<void>();

  public toggleAll(): void {
    this.selectionModel.clear();
    if (!this.allSelected) {
      this.dataSource.forEach((item) => this.selectionModel.select(item));
      this.allSelected = true;
    }
  }

  public toggleItem(item: unknown): void {
    this.selectionModel.toggle(item);
    this.allSelected = this.selectionModel.selected.length === this.dataSource.length;
    this.selectionChange.emit(this.selectionModel.selected);
  }
}
