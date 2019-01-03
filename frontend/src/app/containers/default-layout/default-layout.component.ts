import {Component, OnDestroy, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../auth/_services/auth.service';

import { navItems } from './../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;


  constructor(
    private titleTagService: Title,
    public auth: AuthService
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: [ 'class' ]
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  public setTitle( pageTitle: string) {
    this.titleTagService.setTitle( pageTitle );
  }

  ngOnInit() {
    if (this.auth.getToken()) {
      this.auth.getUser().subscribe();
    }
  }

  onLogout() {
    this.auth.onLogout().subscribe();
    localStorage.removeItem('token');
  }




}
