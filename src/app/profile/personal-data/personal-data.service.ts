import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { Observable, tap } from 'rxjs';

import { User } from '@common/models/users';
import { CurrentUserService, UsersService } from '@common/services';

@Injectable()
export class PersonalDataService {
  public readonly personalData$ = this.currentUserService.currentUser$;

  public constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly toastrService: NbToastrService,
    private readonly usersService: UsersService,
  ) { }

  public updatePersonalData(personalData: Omit<User, 'id'>): Observable<User> {
    const userId = this.currentUserService.currentUserSnapshot!.id;
    return this.usersService.updateUser({ ...personalData, id: userId })
      .pipe(
        tap({
          error: (err: HttpErrorResponse) => this.toastrService.danger(
            err.error?.message ?? 'Произошла ошибка при попытке обновить персональные данные',
            'Ошибка обновления профиля',

          ),
          next: (user) => {
            this.toastrService.success('Персональные данные обновлены.', 'Профиль обновлён');
            this.currentUserService.setUserDetails(user);
          },
        }),
      );
  }
}
