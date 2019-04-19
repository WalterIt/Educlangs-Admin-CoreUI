import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



import { UserProfile } from './user-profile';
import { User } from '../../auth/user';
import { UserAddress } from './user-address';

import { UserProfileService } from './user-profile.service';
import { AuthService } from '../../auth/_services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: []
})
export class UserProfileComponent implements OnInit {
  userProfiles: UserProfile[];
  userprofile: UserProfile = new UserProfile();
  user: User = new User();
  userAddress: UserAddress = new UserAddress();
  error: any;
  userProfileForm: FormGroup;
  user1 = [];
  userprofile1 = [];
  userAddress1 = [];




  constructor(
    private userProfileService: UserProfileService,
    private fb: FormBuilder,
    private auth: AuthService
    ) {
      this.createForm();
    }

    ngOnInit() {

      this.userProfileService.getUserDetails(this.auth.currentUser.id).then(userprofile => this.userProfiles = userprofile);

      console.log(this.userProfiles);

      // console.log(this.userProfile);

    }

    createForm() {
      this.userProfileForm = this.fb.group({

        /**   USER PROFILE */
        gender: [this.userprofile.gender],
        firstName: [this.userprofile.firstName],
        lastName: [this.userprofile.lastName],
        phoneHome: [this.userprofile.phoneHome],
        mobile: [this.userprofile.mobile],
        photo: [this.userprofile.photo],
        // status: [this.userprofile.status],
        // lang_id: [this.userprofile.lang_id],
        birthdate: [this.userprofile.birthdate],

        /**   USER  */
        email: [this.user.email],


        /**   USER ADDRESS */
        houseApNum: [this.userAddress.houseApNum],
        street: [this.userAddress.street],
        city: [this.userAddress.city],
        state: [this.userAddress.state],
        zip: [this.userAddress.zip],
        country: [this.userAddress.country]


        // name: [this.user.name, Validators.compose([Validators.required])],
        // email: [this.user.email, Validators.compose([Validators.required, Validators.email ])],
        // password: [this.user.password, Validators.compose([Validators.required, Validators.minLength(6)])],



      });
    }

    onSubmit(): void {


      console.log(this.userProfileForm.value);

      //  USER DATA
      this.user1['email'] = this.userProfileForm.value.email;
      console.log(this.user1);


      //  USERPROFILE DATA
      this.userprofile1['gender'] = this.userProfileForm.value.gender;
      this.userprofile1['firstName'] = this.userProfileForm.value.firstName;
      this.userprofile1['lastName'] = this.userProfileForm.value.lastName;
      this.userprofile1['phoneHome'] = this.userProfileForm.value.phoneHome;
      this.userprofile1['mobile'] = this.userProfileForm.value.mobile;
      this.userprofile1['photo'] = this.userProfileForm.value.photo;
      this.userprofile1['birthdate'] = this.userProfileForm.value.birthdate;

      console.log(this.userprofile1);

       //  USER ADDRESS DATA  this.userAddress1
        this.userAddress1['houseApNum'] = this.userProfileForm.value.houseApNum;
        this.userAddress1['street'] = this.userProfileForm.value.street;
        this.userAddress1['city'] = this.userProfileForm.value.city;
        this.userAddress1['state'] = this.userProfileForm.value.state;
        this.userAddress1['zip'] = this.userProfileForm.value.zip;
        this.userAddress1['country'] = this.userProfileForm.value.country;

        console.log(this.userAddress1);


      /*
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
      */
    }
  }
