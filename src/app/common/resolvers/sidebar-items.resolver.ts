import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { Observable } from 'rxjs';

import { NavigationService } from '@common/services';

@Injectable({ providedIn: 'root' })
export class SidebarItemsResolver implements Resolve<NbMenuItem[]> {
  public constructor(private readonly navService: NavigationService) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<NbMenuItem[]> {
    const sidebarItems = route.data['sidebar'] ?? [] as NbMenuItem[];
    this.navService.setSidebarItems(sidebarItems);
    return sidebarItems;
  }
}
