import { ChangeDetectionStrategy, Component } from '@angular/core';

import { USERS_TABLE_COLUMNS } from './constants';

@Component({
  selector: 'ww-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  public readonly tableColumns = [...USERS_TABLE_COLUMNS];
}
