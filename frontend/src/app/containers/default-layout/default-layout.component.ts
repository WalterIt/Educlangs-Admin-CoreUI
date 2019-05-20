import {Component, OnDestroy, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';

import { navItems } from './../../_nav';

import { AuthService } from '../../auth/_services/auth.service';
import { UserProfileService } from '../../views/user-profile/service/user-profile.service';

import { UserProfile } from '../../views/user-profile/service/user-profile';
import { User } from '../../auth/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  public currentUser: User;

  userprofiles: UserProfile[];
  avatar: any = 'assets/img/avatars/avatar_placeholder.png';


  constructor(
    private titleTagService: Title,
    private auth: AuthService,
    private userProfileService: UserProfileService
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: [ 'class' ]
    });

    /*

    this.userProfileService.getUserProfileDetails(this.auth.currentUser.id).then(
      (data) => {

        this.userprofiles = data;

        // console.log('TEST 0 : ', this.userprofiles['photo'].length);


        // tslint:disable-next-line:max-line-length
        this.avatar = (this.userprofiles['photo'].length > 100) ? this.userprofiles['photo'] : 'assets/img/avatars/avatar_placeholder.png';

      },
      (error) => {
        console.log(error);
      }
    );
    */

  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  public setTitle( pageTitle: string) {
    this.titleTagService.setTitle( pageTitle );
  }

  ngOnInit() {
    if (this.auth.getToken()) {

      this.auth.getUser().subscribe(
        (user: User) => {
          this.currentUser = user;

          // console.log(this.currentUser.id);


          this.userProfileService.getUserProfileDetails(this.currentUser.id).then(
            (data) => {

              this.userprofiles = data;

              // console.log('TEST 0 : ', this.userprofiles['photo'].length);


              // tslint:disable-next-line:max-line-length
              this.avatar = (this.userprofiles['photo'].length > 100) ? this.userprofiles['photo'] : 'assets/img/avatars/avatar_placeholder.png';

            },
            (error) => {
              console.log(error);
            }
          );







        }
      );



    }
  }

  onLogout() {
    this.auth.onLogout().subscribe();
    localStorage.removeItem('token');
  }






}
