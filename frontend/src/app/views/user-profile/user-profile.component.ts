import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserProfile } from './user-profile';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: []
})
export class UserProfileComponent implements OnInit {
  userprofile: UserProfile = new UserProfile();
  error: any;
  userProfileForm: FormGroup;


  constructor(
    private userProfileService: UserProfileService,
    private fb: FormBuilder
    ) {
      this.createForm();
    }

    ngOnInit() {}

    createForm() {
      this.userProfileForm = this.fb.group({
        // name: [this.user.name, Validators.compose([Validators.required])],
        // email: [this.user.email, Validators.compose([Validators.required, Validators.email ])],
        // password: [this.user.password, Validators.compose([Validators.required, Validators.minLength(6)])],



      });
    }

    onSubmit(): void {

      this.userProfileService.addUserProfile(this.userProfileForm.value).subscribe(

        (response) => {
          // this.router.navigate(['login']);
        },
        (response) => {
          if (response.status === 422) {
            Object.keys(response.error).map((err) => {
              this.error = `${response.error[err]}`;
            });

          } else {
            this.error = response.error;
          }

        }
      );
    }
  }
