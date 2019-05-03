import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { Column, Message } from 'primeng/primeng';

import { UserProfile } from './user-profile';
import { User } from '../../auth/user';
import { UserAddress } from './user-address';
import Country from './service/country';

import { UserProfileService } from './user-profile.service';
import { AuthService } from '../../auth/_services/auth.service';
import { CountryService } from './service/country.service';

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

  data: any = [];

  msgs: Message[] = [];
  messages: Message[] = [];

  //  **  COUNTRY DROPDOWN //
  country: Country;
  countries: Country[];
  customCountry: Country;
  filteredCountries: Country[];
  filteredCustomCountries: Country[];




  constructor(
    private userProfileService: UserProfileService,
    private fb: FormBuilder,
    private auth: AuthService,
    private countryService: CountryService
    ) {
      // this.createForm();
    }

    ngOnInit() {

      // this.userProfileService.getUserDetails(this.auth.currentUser.id).then(userprofile => this.userProfiles = userprofile);

      // console.log(this.userProfiles);

      // console.log(this.userProfile);



      // ********   NEW CODE

      this.userProfileForm = this.fb.group({
        gender: [this.userprofile.gender],
        firstName: [this.userprofile.firstName],
        lastName: [this.userprofile.lastName],
        phoneHome: [this.userprofile.phoneHome],
        mobile: [this.userprofile.mobile, Validators.compose([
                        Validators.minLength(9),   Validators.required, Validators.pattern('[0-9-]+') ] )],
        photo: [this.userprofile.photo],
        // status: [this.userprofile.status],
        // lang_id: [this.userprofile.lang_id],
        birthdate: [this.userprofile.birthdate],

        /**   USER  */
        email: [this.user.email, Validators.compose([Validators.required, Validators.email ])],


        /**   USER ADDRESS */
        houseApNum: [this.userAddress.houseApNum],
        street: [this.userAddress.street],
        city: [this.userAddress.city],
        state: [this.userAddress.state],
        zip: [this.userAddress.zip],
        country: [this.userAddress.country]
      });


      /*
      this.user = this.userService.loadUser().pipe(
        tap(user => this.form.patchValue(user))
      );
      */


      /**   USER PROFILE */
      this.userProfileService.getUserProfileDetails(this.auth.currentUser.id)
                .then(userprofile => this.userProfileForm.patchValue(userprofile));

      /**   USER EMAIL */
      this.userProfileService.getUserDetail(this.auth.currentUser.id).then(user => this.userProfileForm.patchValue(user));


      /**   USER ADDRESS */
      this.userProfileService.getUserAddressDetails(this.auth.currentUser.id)
            .then(userAddress => this.userProfileForm.patchValue(userAddress));


    }

    // COUNTRY DROPDOWN
    filterCountries(event: any) {
      let query = event.query;
      this.countryService.getCountries().subscribe((countries: Country[]) => {
          this.filteredCountries = this.filterCountry(query, countries);
      });
    }


    filterCustomCountries(event: any) {
      let query = event.query;
      this.countryService.getCountries().subscribe((countries: Country[]) => {
          this.filteredCustomCountries = this.filterCountry(query, countries);
      });
    }

    filterCountry(query: any, countries: Country[]): Country[] {
      let filtered: any[] = [];
      for (let country of countries) {
          if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
              filtered.push(country);
          }
      }
      return filtered;
    }

    submit( ) {

      if (this.userProfileForm.valid) {
        // console.log(this.userProfileForm.value);

        //  USER DATA
        this.user1['email'] = this.userProfileForm.value.email;

        // console.log(this.userProfileForm.value.email);


        // console.log(this.auth.currentUser.email);
        console.log(this.user1);  // ARRAY

        // this.auth.currentUser.id
        if (this.auth.currentUser.email !== this.user1['email']) {

          let id = this.auth.currentUser.id;

          this.userProfileService.editUserEmail(id, this.user1)
            .subscribe(response => {

              console.log('SUCCESSFULLY CREATED Email!');

            },
              (error) => {
                this.error = error.error;
                console.log(this.error);
            });



            /*
            onEditComplete(event: { column: Column, data: any }): void {
              this.logs.push('onEditComplete -', JSON.stringify(event.data));
              // let data = JSON.stringify(event.data);
              let language = event.data;
              // console.log('onEditComplete -', language);


              let id = language.id;
              // console.log('ID Accessed! ', id);
              this.languageService.editLanguage(id, language)
                .subscribe(response => {
                  // this.isLoading = false;
                  // this.language = response['data'];
                },
                (error) => {
                  this.error = error.error;
                  this.messages = [];
                  if ((this.error['name'])) {
                    this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['name'] });
                  }

                });
            }
            */




        } else {
          console.log('EMAIL: Do Nothing!');

        }



      }

          //  CREATE USERPROFILE DATA
          this.userprofile1['gender'] = this.userProfileForm.value.gender;
          this.userprofile1['firstName'] = this.userProfileForm.value.firstName;
          this.userprofile1['lastName'] = this.userProfileForm.value.lastName;
          this.userprofile1['phoneHome'] = this.userProfileForm.value.phoneHome;
          this.userprofile1['mobile'] = this.userProfileForm.value.mobile;
          this.userprofile1['photo'] = this.userProfileForm.value.photo;
          this.userprofile1['birthdate'] = this.userProfileForm.value.birthdate;

          console.log(this.userprofile1);

          //  CREATE USER ADDRESS DATA  this.userAddress1
          this.userAddress['houseApNum'] = this.userProfileForm.value.houseApNum;
          this.userAddress['street'] = this.userProfileForm.value.street;
          this.userAddress['city'] = this.userProfileForm.value.city;
          this.userAddress['state'] = this.userProfileForm.value.state;
          this.userAddress['zip'] = this.userProfileForm.value.zip;
          this.userAddress['country'] = this.userProfileForm.value.country['name'];

          console.log(this.userAddress);



      //  Check if USERPROFILE URL - userprofile/id exists
      this.userProfileService.getUserProfileDetailsValidation(this.auth.currentUser.id)
            .subscribe(
              (response) => {
                console.log('UserProfile Exists!');

                // UPDATE USER PROFILE
                this.userProfileService.editUserProfile(this.auth.currentUser.id, this.userProfileForm.value)
                .subscribe(response => {

                  console.log('SUCCESSFULLY CREATED USERPROFILE!');
                  // tslint:disable-next-line:max-line-length
                  this.messages = [];
                  // tslint:disable-next-line:max-line-length
                  this.messages.push({severity: 'success', summary: 'Success Message', detail: 'User Profile has been updated successfully!' });

                },
                  (error) => {
                    this.error = error.error;
                    console.log(this.error);
                });

                // UPDATE USER ADDRESS
                this.userProfileService.editUserAddress(this.auth.currentUser.id, this.userAddress)
                .subscribe(response => {

                  // console.log('SUCCESSFULLY UpdateD USERADDRESS!');
                  // tslint:disable-next-line:max-line-length
                  // this.messages.push({severity: 'success', summary: 'Success Message', detail: 'User Address has been updated successfully!' });

                },
                  (error) => {
                    this.error = error.error;
                    console.log(this.error);
                });


              },
              (error) => {
                  this.error = error.error;
                 //  console.log(this.error);
                 // console.log('Create UserProfile & Address!');

                 // CREATE USER PROFILE
                    this.userProfileService.addUserProfile(this.userProfileForm.value)
                      .subscribe(response => {

                        // console.log('SUCCESSFULLY CREATED USERPROFILE!');
                        // tslint:disable-next-line:max-line-length
                        this.messages = [];
                        // tslint:disable-next-line:max-line-length
                        this.messages.push({severity: 'success', summary: 'Success Message', detail: 'User Profile has been created successfully!' });

                      },
                        (error) => {
                          this.error = error.error;
                          console.log(this.error);
                      });


                      // CREATE USER ADDRESS
                      this.userProfileService.addUserAddress(this.userAddress)
                          .subscribe(response => {

                            // console.log('SUCCESSFULLY UpdateD USERADDRESS!');

                          },
                            (error) => {
                              this.error = error.error;
                              console.log(this.error);
                          });

                }
            );









    }







     // ********  END OF   NEW CODE






    /*
    createForm() {
      this.userProfileForm = this.fb.group({

        /**   USER PROFILE
        gender: [this.userprofile.gender],
        firstName: [this.userprofile.firstName],
        lastName: [this.userprofile.lastName],
        phoneHome: [this.userprofile.phoneHome],
        mobile: [this.userprofile.mobile],
        photo: [this.userprofile.photo],
        // status: [this.userprofile.status],
        // lang_id: [this.userprofile.lang_id],
        birthdate: [this.userprofile.birthdate],

        /**   USER
        email: [this.user.email],


        /**   USER ADDRESS
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
    */



    /*
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

    }
    */
  }
