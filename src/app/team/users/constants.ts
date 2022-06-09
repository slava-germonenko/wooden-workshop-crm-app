import { ActionsProvider, ColumnDescriptor, ItemAction } from '@framework/table-list';
import { User } from '@common/models/users';

export const USERS_TABLE_COLUMNS: ColumnDescriptor<User>[] = [
  {
    name: 'firstName',
    label: 'Имя',
    cellType: 'text',
    getValue: (user) => user.firstName,
  },
  {
    name: 'lastName',
    label: 'Фамилия',
    cellType: 'text',
    getValue: (user) => user.lastName,
  },
  {
    name: 'emailAddress',
    label: 'Почта',
    cellType: 'text',
    getValue: (user) => user.emailAddress,
  },
  {
    name: 'active',
    label: 'Статус',
    cellType: 'tag',
    getValue: (user) => (user.active ? 'Активен' : 'Не активен'),
    getStatus: (user) => (user.active ? 'success' : 'danger'),
  },
];

export const USER_ACTIONS_PROVIDER: ActionsProvider<User> = (user) => {
  const actions: ItemAction[] = [];
  if (user.active) {
    actions.push({
      id: 'deactivate',
      icon: 'toggle-left-outline',
      title: 'Деактивировать',
    });
  } else {
    actions.push({
      id: 'activate',
      icon: 'toggle-right-outline',
      title: 'Активировать',
    });
  }

  return actions;
};
