import { FormField } from '@framework/form';
import { ConfirmConfig } from '@framework/confirmation-dialog';

export const ACCEPT_INVITATION_FORM_FIELD: FormField[] = [
  {
    id: 'firstName',
    label: 'Имя',
    type: 'text',
  },
  {
    id: 'lastName',
    label: 'Фамилия',
    type: 'text',
  },
  {
    id: 'password',
    label: 'Пароль',
    type: 'password',
  },
];

export const DECLINE_INVITATION_DIALOG_CONFIG: ConfirmConfig = {
  title: 'Отклонить приглашение',
  questionHtml: `
    Вы действтительно хотите отклонить приглашение? <br>
    Вы не сможете принять это же приглашение в будущем!
  `,
  confirmText: 'Отклонить прилгалшение',
  declineText: 'Отмена',
};
