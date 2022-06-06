import { Injectable } from '@angular/core';

import { EnvironmentService } from './environment.service';

@Injectable({ providedIn: 'root' })
export class ApiUrlsService {
  private get apiUrl(): string {
    return this.environmentService.baseApiUrl;
  }

  public constructor(private readonly environmentService: EnvironmentService) { }

  public getBaseUsersEndpointUrl(): string {
    return `${this.apiUrl}/api/users`;
  }

  public getLoginEndpointUrl(): string {
    return `${this.apiUrl}/api/auth`;
  }

  public getLogoutEndpointUrl(): string {
    return `${this.apiUrl}/api/auth/sign-out`;
  }

  public getRefreshSessionEndpointUrl(): string {
    return `${this.apiUrl}/api/auth/refresh`;
  }

  public getUserDetailsEndpointUrl(userId: number): string {
    return `${this.apiUrl}/api/users/${userId}`;
  }

  public getUserInvitationsBaseEndpointUrl(): string {
    return `${this.apiUrl}/api/user-invitations`;
  }
}
