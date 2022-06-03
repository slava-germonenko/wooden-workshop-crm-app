import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, isObservable } from 'rxjs';

import { ColumnDescriptor } from './column-descriptor';
import { ActionsProvider } from './types';

@Component({
  selector: 'ww-table-list',
  templateUrl: 'table-list.component.html',
  styleUrls: ['table-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableListComponent {
  private dataSourceStream = new BehaviorSubject<unknown[]>([]);

  public dataSourceInner: Observable<unknown[]> = this.dataSourceStream;

  public selectionModel = new SelectionModel<unknown>(true);

  public allChecked = false;

  @Input()
  public columns: ColumnDescriptor<unknown>[] = [];

  @Input()
  public getEntryActions: ActionsProvider | null = null;

  @Input()
  public selectEnabled = false;

  @Input()
  public set dataSource(data: Observable<unknown[]> | unknown[]) {
    if (isObservable(data)) {
      this.dataSourceInner = data;
    } else {
      this.dataSourceInner = this.dataSourceStream;
      this.dataSourceStream.next(data);
    }
  }
}
