import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { NbMenuItem, NbMenuService } from '@nebular/theme';

import { ColumnDescriptor } from './column-descriptor';
import { ActionsProvider } from './types';
import { filter, map } from 'rxjs';
import { ItemAction } from '@framework/table-list/item-action';

@Component({
  selector: 'ww-table-list',
  templateUrl: 'table-list.component.html',
  styleUrls: ['table-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableListComponent implements OnInit {
  public selectionModel = new SelectionModel<unknown>(true);

  public allSelected = false;

  @Input()
  public columns: ColumnDescriptor<unknown>[] = [];

  @Input()
  public dataSource: unknown[] = [];

  @Input()
  public getEntryActions: ActionsProvider<any> | null = null;

  @Input()
  public selectEnabled = false;

  @Input()
  public length = 0;

  @Input()
  public loading = false;

  @Output()
  public action = new EventEmitter<{ id: string, data: unknown }>();

  @Output()
  public selectionChange = new EventEmitter<unknown[]>();

  @Output()
  public loadMoreClick = new EventEmitter<void>();

  public constructor(private readonly nbMenuService: NbMenuService) { }

  public ngOnInit(): void {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'table-list-actions'),
      )
      .subscribe(({ item }) => this.action.emit({ id: item.data.id, data: item.data.row }));
  }

  // eslint-disable-next-line class-methods-use-this
  public mapActionItems(actionItems: ItemAction[], row: unknown): NbMenuItem[] {
    return actionItems.map((item) => {
      return {
        ...item,
        data: {
          id: item.id,
          row,
        },
      };
    });
  }

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
