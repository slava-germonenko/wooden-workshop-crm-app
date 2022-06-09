import { dateTimeFormatter, toLocalDateTime } from '@common/helper-functions';
import { Invitation } from '@common/models/invitations';
import { ActionsProvider, ColumnDescriptor, ItemAction } from '@framework/table-list';

export const INVITATIONS_TABLE_COLUMNS: ColumnDescriptor<Invitation>[] = [
  {
    name: 'emailAddress',
    label: 'Получатель',
    cellType: 'text',
    getValue: (invitation) => invitation.emailAddress,
  },
  {
    name: 'expireDate',
    label: 'Действительно до',
    cellType: 'text',
    getValue: (invitation) => dateTimeFormatter(toLocalDateTime(invitation.expireDate)),
  },
  {
    name: 'status',
    label: 'Статус',
    cellType: 'tag',
    getValue: (invitation) => {
      if (invitation.accepted === true) {
        return 'Принято';
      }
      if (invitation.accepted === false) {
        return 'Отклонено';
      }
      if (!invitation.active) {
        return 'Неактивно';
      }
      const invitationDate = toLocalDateTime(invitation.expireDate);
      if (invitationDate < new Date()) {
        return 'Истекло';
      }
      return 'Отправлено';
    },
    getStatus: (invitation) => {
      if (invitation.accepted === true) {
        return 'success';
      }
      if (invitation.accepted === false) {
        return 'danger';
      }
      if (!invitation.active) {
        return 'warning';
      }
      const invitationDate = toLocalDateTime(invitation.expireDate);
      if (invitationDate < new Date()) {
        return 'warning';
      }
      return 'basic';
    },
  },
];

export const INVITATION_ACTIONS_PROVIDER: ActionsProvider<Invitation> = (invitation) => {
  const actions: ItemAction[] = [];
  if (!invitation.accepted) {
    actions.push({
      id: 'resend',
      icon: 'paper-plane-outline',
      title: 'Выслать заново',
    });
  }

  if (invitation.active && invitation.accepted === null) {
    actions.push({
      id: 'deactivate',
      icon: 'undo-outline',
      title: 'Отозвать',
    });
  }

  return actions;
};
