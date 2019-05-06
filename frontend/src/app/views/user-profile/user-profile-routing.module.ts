import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User-Profile'
    },
    children: [
      {
        path: '',
        // redirectTo: 'languages'
        redirectTo: 'user-profile'
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        data: {
          title: 'User-Profile'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
