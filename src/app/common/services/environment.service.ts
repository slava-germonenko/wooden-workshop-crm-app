import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  private readonly env = { ...environment };

  public get baseApiUrl(): string {
    let url = `${this.env.api.protocol}://${this.env.api.domain}`;
    const { port } = this.env.api;
    if (port && port !== 80 && port !== 430) {
      url = `${url}:${port}`;
    }
    return url;
  }
}
