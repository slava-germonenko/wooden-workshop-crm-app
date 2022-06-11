import { FormField, required } from '@framework/form';

export const PASSWORD_FORM_FIELD: FormField[] = [
  {
    id: 'password',
    type: 'password',
    label: 'Новый Пароль',
    validators: [required('Пожалуйста, введите пароь.')],
  },
  {
    id: 'confirmPassword',
    type: 'password',
    label: 'Подтверждение Пароля',
    validators: [required('Пожалуйста, подтвердите пароль.')],
  },
];
