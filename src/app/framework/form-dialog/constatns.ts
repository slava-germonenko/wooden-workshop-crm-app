import { InjectionToken } from '@angular/core';

import { FormDialogConfig } from './form-dialog-config';

export const WW_FORM_DIALOG_CONFIG = new InjectionToken<FormDialogConfig | null>('WwFormDialog');
