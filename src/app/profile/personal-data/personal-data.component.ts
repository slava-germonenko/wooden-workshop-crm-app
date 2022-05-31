import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import { User } from '@common/models/users';

import { PERSONAL_DATA_FORM_FIELDS } from './form-fields';
import { PersonalDataService } from './personal-data.service';

@Component({
  selector: 'ww-personal-data',
  templateUrl: 'personal-data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalDataComponent implements OnInit {
  public readonly personalDataFormFields = [...PERSONAL_DATA_FORM_FIELDS];

  public loading = true;

  public personalData: User | null = null;

  public constructor(
    private readonly personalDataService: PersonalDataService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.personalDataService.personalData$.subscribe((personalData) => {
      this.personalData = personalData;
      this.loading = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  public updateProfile(personalData: Record<string, any>): void {
    this.personalDataService.updatePersonalData(personalData as Omit<User, 'id'>).subscribe();
  }
}
