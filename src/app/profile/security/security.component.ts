import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

import { CurrentUserService, UsersService } from '@common/services';

import { PASSWORD_FORM_FIELD } from './password-form-fields';

@Component({
  selector: 'ww-security',
  templateUrl: 'security.component.html',
  styleUrls: ['security.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityComponent {
  public readonly passwordFormFields = [...PASSWORD_FORM_FIELD];

  public constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly toastr: NbToastrService,
    private readonly usersService: UsersService,
  ) { }

  public changePassword(data: unknown): void {
    const { password, confirmPassword } = data as { password: string, confirmPassword: string };
    if (password !== confirmPassword) {
      this.toastr.danger('Пароли не совпадают!', 'Ошибка валидации пароля');
      return;
    }

    const currentUserId = this.currentUserService.currentUserSnapshot!.id;
    this.usersService.setUserPassword(currentUserId, password).subscribe();
  }
}
