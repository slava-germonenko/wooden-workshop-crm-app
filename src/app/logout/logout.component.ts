import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

import { AuthorizationService, NavigationService } from '@common/services';

@Component({
  selector: 'ww-logout',
  template: `
    <div
      class="full-size"
      [nbSpinner]="true"
      nbSpinnerSize="giant"
      nbSpinnerStatus="primary"
      nbSpinnerMessage="Выходим из приложения"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent implements OnInit {
  public constructor(
    private readonly authService: AuthorizationService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.navigationService.setShowNavigation(false);
    this.authService.logout()
      .pipe(
        catchError(() => of(null)),
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
