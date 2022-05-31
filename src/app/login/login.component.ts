import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './login.service';

@Component({
  selector: 'ww-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public readonly loginFormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public get username(): string {
    return this.loginFormGroup.get('username')?.value as string;
  }

  public get password(): string {
    return this.loginFormGroup.get('password')?.value as string;
  }

  public set password(password: string) {
    this.loginFormGroup.get('password')?.setValue(password);
  }

  public constructor(private readonly loginService: LoginService) { }

  public login(): void {
    this.loginService.login(this.username, this.password)
      .subscribe({
        error: () => {
          this.password = '';
        },
      });
  }
}
