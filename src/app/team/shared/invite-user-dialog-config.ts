import { FormDialogConfig } from '@framework/form-dialog';
import { email, required } from '@framework/form';

export const INVITE_USER_DIALOG_CONFIG: FormDialogConfig = {
  title: 'Приглашение в команду',
  submitText: 'Пригласить',
  cancelText: 'Отменить',
  showCancel: true,
  formFields: [
    {
      id: 'emailAddress',
      label: 'Почтовый адрес',
      type: 'text',
      validators: [
        email('Пожалуйста, введите корректный адрес электронной почты.'),
        required('Пожалуйста, введите адрес электронной почты.'),
      ],
    },
  ],
};
