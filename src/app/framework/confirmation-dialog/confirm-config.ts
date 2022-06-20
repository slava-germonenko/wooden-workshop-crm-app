import { SafeHtml } from '@angular/platform-browser';

export interface ConfirmConfig {
  confirmText?: string;
  declineText?: string;
  questionHtml: string | SafeHtml;
  title?: string
}
