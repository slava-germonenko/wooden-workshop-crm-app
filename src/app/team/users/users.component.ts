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

import { User } from '@common/models/users';

import { USER_ACTIONS_PROVIDER, USERS_TABLE_COLUMNS } from './constants';
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

  public loading$ = this.usersStateService.loading$;

  public readonly searchControl = new FormControl('');

  public readonly tableColumns = [...USERS_TABLE_COLUMNS];

  public readonly getUserActions = USER_ACTIONS_PROVIDER;

  public readonly users$ = this.usersStateService.users$;

  public readonly total$ = this.usersStateService.totalUsersCount$;

  public constructor(
    private readonly usersStateService: UsersStateService,
  ) { }

  public loadMoreClick(): void {
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
      )
      .subscribe(([search, active]) => {
        this.usersStateService.setFilters({ search, active });
      });
  }

  public handleUserAction({ id, data }: { id: string, data: unknown }): void {
    switch (id) {
      case 'activate': {
        this.usersStateService.updateUserStatus(data as User, true);
        break;
      }
      case 'deactivate': {
        this.usersStateService.updateUserStatus(data as User, false);
        break;
      }
      default: { break; }
    }
  }

  public openUserInvitationDialog(): void {
    this.usersStateService.openUserInvitationDialog();
  }

  public ngOnDestroy(): void {
    this.filterChangesSub?.unsubscribe();
    this.filterChangesSub = null;
  }
}
