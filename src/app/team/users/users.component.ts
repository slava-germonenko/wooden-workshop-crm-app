import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Subscription,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  skip,
  tap,
} from 'rxjs';

import { USERS_TABLE_COLUMNS } from './constants';
import { UsersStateService } from './users-state.service';

@Component({
  selector: 'ww-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, OnDestroy {
  private filterChangesSub: Subscription | null = null;

  public activeUsersToggleControl = new FormControl(false);

  public searchControl = new FormControl('');

  public loading = true;

  public readonly tableColumns = [...USERS_TABLE_COLUMNS];

  public readonly users$ = this.usersStateService.users$
    .pipe(
      tap(() => {
        this.loading = false;
      }),
    );

  public readonly total$ = this.usersStateService.totalUsersCount$;

  public constructor(private readonly usersStateService: UsersStateService) { }

  public loadMoreClick(): void {
    this.loading = true;
    this.usersStateService.markAsPendingNextPage();
  }

  public ngOnInit(): void {
    const searchStream = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(300),
      distinctUntilChanged(),
    );

    const activeOnlyStream = this.activeUsersToggleControl.valueChanges.pipe(
      startWith(this.activeUsersToggleControl.value),
      debounceTime(100),
      distinctUntilChanged(),
      map<boolean, true | undefined>((active) => active || undefined),
    );

    this.filterChangesSub = combineLatest([searchStream, activeOnlyStream])
      .pipe(
        skip(1),
        tap(() => {
          this.loading = true;
        }),
      )
      .subscribe(([search, active]) => {
        this.usersStateService.setFilters({ search, active });
      });
  }

  public ngOnDestroy(): void {
    this.filterChangesSub?.unsubscribe();
    this.filterChangesSub = null;
  }
}
