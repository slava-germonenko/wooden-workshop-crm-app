import { InvitationTypes } from '@common/enums';

export interface Invitation {
  id: number;
  accepted: boolean | null;
  active: boolean;
  createDate: Date;
  emailAddress: string;
  expireDate: Date;
  type: InvitationTypes;
  updatedDate: Date | null;
}
