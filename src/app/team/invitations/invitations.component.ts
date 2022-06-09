import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  skip,
  startWith,
  Subscription,
  tap,
} from 'rxjs';

import { Invitation } from '@common/models/invitations';

import { INVITATION_ACTIONS_PROVIDER, INVITATIONS_TABLE_COLUMNS } from './constants';
import { InvitationsStateService } from './invitations-state.service';

@Component({
  selector: 'ww-invitations',
  templateUrl: 'invitations.component.html',
  styleUrls: ['invitations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationsComponent implements OnInit, OnDestroy {
  private filterChangesSub: Subscription | null = null;

  public loading$ = this.invitationsService.loading$;

  public readonly searchControl = new FormControl('');

  public filtersApplied = 0;

  public readonly filtersForm = new FormGroup({
    expired: new FormControl(false),
    active: new FormControl(false),
    pending: new FormControl(false),
  });

  public readonly tableColumns = [...INVITATIONS_TABLE_COLUMNS];

  public readonly getInvitationsActions = INVITATION_ACTIONS_PROVIDER;

  public readonly invitations$ = this.invitationsService.invitations$;

  public readonly total$ = this.invitationsService.totalInvitationsCount$;

  public constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly invitationsService: InvitationsStateService,
  ) { }

  public ngOnInit(): void {
    const searchStream = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(300),
      distinctUntilChanged(),
    );

    const filtersStream = this.filtersForm.valueChanges.pipe(
      startWith({}),
      debounceTime(100),
      map((filtersFormValue) => {
        return {
          active: filtersFormValue.active || undefined,
          expired: filtersFormValue.expired || undefined,
          pending: filtersFormValue.pending || undefined,
        };
      }),
      tap(() => this.setFiltersApplied()),
    );

    this.filterChangesSub = combineLatest([searchStream, filtersStream])
      .pipe(
        skip(1),
      )
      .subscribe(([search, filter]) => this.invitationsService.setFilters({ search, ...filter }));
  }

  public handleAction({ id, data }: { id: string; data: unknown }): void {
    switch (id) {
      case 'resend': {
        this.invitationsService.resendInvitation(data as Invitation);
        break;
      }
      case 'deactivate': {
        this.invitationsService.deactivateInvitation(data as Invitation);
        break;
      }
      default: break;
    }
  }

  public loadMore(): void {
    this.invitationsService.markAsPendingNextPage();
  }

  public openUserInvitationDialog(): void {
    this.invitationsService.openUserInvitationDialog();
  }

  public ngOnDestroy(): void {
    this.filterChangesSub?.unsubscribe();
    this.filterChangesSub = null;
  }

  private setFiltersApplied(): void {
    let filtersApplied = 0;
    const filters = this.filtersForm.value;
    if (filters.accepted) {
      filtersApplied += 1;
    }
    if (filters.active) {
      filtersApplied += 1;
    }
    if (filters.expired) {
      filtersApplied += 1;
    }
    this.filtersApplied = filtersApplied;
    this.changeDetector.markForCheck();
  }
}
