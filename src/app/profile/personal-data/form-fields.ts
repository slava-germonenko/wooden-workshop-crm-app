import { FormField, email, required } from '@framework/form';

export const PERSONAL_DATA_FORM_FIELDS: FormField[] = [
  {
    id: 'firstName',
    type: 'text',
    label: 'Имя',
    validators: [required('Пожауйста, введите имя.')]
  },
  {
    id: 'lastName',
    type: 'text',
    label: 'Фамилия',
    validators: [required('Пожауйста, введите фамилию.')]
  },
  {
    id: 'emailAddress',
    type: 'text',
    label: 'Почта',
    validators: [
      required('Пожауйста, введите адрес электронной почты.'),
      email('Пожауйста, введите корректный адрес электронной почты.'),
    ],
  },
];
