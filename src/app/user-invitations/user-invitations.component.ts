import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  exhaustMap,
  map,
  Observable,
  take,
  tap,
} from 'rxjs';

import { toLocalDateTime } from '@common/helper-functions';
import { AcceptUserInvitationDto, Invitation } from '@common/models/invitations';
import { excludeNulls } from '@common/rxjs';
import {
  AuthorizationService,
  CurrentUserService,
  NavigationService,
  UserInvitationsService,
  UsersService,
} from '@common/services';
import { User } from '@common/models/users';
import { ConfirmationDialogService } from '@framework/confirmation-dialog';

import { ACCEPT_INVITATION_FORM_FIELD, DECLINE_INVITATION_DIALOG_CONFIG } from './constants';

@Component({
  selector: 'ww-user-invitations',
  templateUrl: 'user-invitations.component.html',
  styleUrls: ['user-invitations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInvitationsComponent implements OnInit, OnDestroy {
  private navigationWasEnabledOnLoad = false;

  @HostBinding('class')
  public readonly hostClasses = ['full-size', 'flex-column'];

  public invitationCanBeAccepted = false;

  public showCurrentUserAlert = true;

  public inviteeEmailAddress?: string;

  public readonly acceptInvitationFormField = [...ACCEPT_INVITATION_FORM_FIELD];

  public readonly currentUser$: Observable<User> = this.currentUserService.currentUser$
    .pipe(
      excludeNulls(),
      take(1),
      tap((currentUser) => {
        this.showCurrentUserAlert = currentUser !== null;
      }),
    );

  public readonly invitation$ = this.activatedRoute.data
    .pipe(
      map<any, Invitation>(({ invitation }) => invitation),
      tap((invitation) => {
        const expireDate = toLocalDateTime(invitation.expireDate);
        this.invitationCanBeAccepted = invitation.accepted === null && invitation.active && expireDate > new Date();
        this.inviteeEmailAddress = invitation.emailAddress;
      }),
    );

  private get invitationToken(): string {
    return this.activatedRoute.snapshot.paramMap.get('uniqueToken')!;
  }

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthorizationService,
    private readonly confirmationDialog: ConfirmationDialogService,
    private readonly currentUserService: CurrentUserService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly userInvitationsService: UserInvitationsService,
    private readonly usersService: UsersService,
  ) { }

  public ngOnInit(): void {
    this.navigationWasEnabledOnLoad = this.navigationService.navigationEnabledSnapshot;
    this.navigationService.setShowNavigation(false);
  }

  public acceptInvitation(userData: unknown): void {
    const invitation: AcceptUserInvitationDto = {
      ...userData as AcceptUserInvitationDto,
      emailAddress: this.inviteeEmailAddress ?? '',
    };
    this.userInvitationsService.acceptUserInvitation(this.invitationToken, invitation)
      .pipe(
        exhaustMap(() => this.authService.login(invitation.emailAddress, invitation.password)),
        exhaustMap(({ accessToken }) => this.usersService.getUser(accessToken.userId)),
      )
      .subscribe((user) => {
        this.currentUserService.startUserSession(user);
        this.navigationService.setShowNavigation(true);
        this.router.navigate(['/profile']);
      });
  }

  public declineInvitation(): void {
    this.confirmationDialog.open(DECLINE_INVITATION_DIALOG_CONFIG)
      .afterConfirmed()
      .pipe(
        exhaustMap(() => this.userInvitationsService.declineUserInvitation(this.invitationToken)),
      )
      .subscribe(() => this.router.navigate(['/login']));
  }

  public ngOnDestroy(): void {
    this.navigationService.setShowNavigation(this.navigationWasEnabledOnLoad);
  }
}
