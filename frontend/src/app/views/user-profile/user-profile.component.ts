import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { Column, Message } from 'primeng/primeng';
// ***  IMAGE CROPPER
import { ImageCroppedEvent } from '../../shared/image-cropper/interfaces/image-cropped-event.interface';
import { ImageCropperComponent } from '../../shared/image-cropper/component/image-cropper.component';

import { UserProfile } from './service/user-profile';
import { User } from '../../auth/user';
import { UserAddress } from './service/user-address';
import Country from './service/country';

import { UserProfileService } from './service/user-profile.service';
import { AuthService } from '../../auth/_services/auth.service';
import { CountryService } from './service/country.service';




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: []
})
export class UserProfileComponent implements OnInit {
  userprofiles: UserProfile[];
  userprofile: UserProfile = new UserProfile();
  user: User = new User();
  userAddress: UserAddress = new UserAddress();
  userCountry: any = '';
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


   // ** IMAGE UPLOAD
   imageUrl: any = 'assets/img/avatars/avatar_placeholder.png'; // "/assets/img/default-image.png";
   fileToUpload: File = null;

  // **  IMAGE CROPPER
  imageChangedEvent: any = '';
  croppedImage: any = 'assets/img/avatars/avatar_placeholder.png';
  // croppedImage: any = '';
  showCropper = false;

  displayDialog: boolean;


  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;


  constructor(
    private userProfileService: UserProfileService,
    private fb: FormBuilder,
    private auth: AuthService,
    private countryService: CountryService
    ) {
      // this.createForm();

      this.userProfileService.getUserProfileDetails(this.auth.currentUser.id).then(
        (data) => {

          this.userprofiles = data;

          // console.log('TEST 0 : ', this.userprofiles['photo'].length);


          // tslint:disable-next-line:max-line-length
          this.croppedImage = (this.userprofiles['photo'].length > 100) ? this.userprofiles['photo'] : 'assets/img/avatars/avatar_placeholder.png';

        },
        (error) => {
          console.log(error);
        }
      );

      this.userProfileService.getUserAddressDetails(this.auth.currentUser.id).then(
        (data) => {

          this.userAddress1 = data;

          // console.log('TEST 0 : ', this.userprofiles['photo'].length);


          // tslint:disable-next-line:max-line-length
          // this.croppedImage = (this.userprofiles['photo'].length > 100) ? this.userprofiles['photo'] : 'assets/img/avatars/avatar_placeholder.png';

        },
        (error) => {
          console.log(error);
        }
      );


    }

    ngOnInit() {


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




      /**   USER PROFILE */
      this.userProfileService.getUserProfileDetails(this.auth.currentUser.id)
                .then(userprofile => this.userProfileForm.patchValue(userprofile));



      /**   USER EMAIL */
      this.userProfileService.getUserDetail(this.auth.currentUser.id).then(user => this.userProfileForm.patchValue(user));


      /**   USER ADDRESS */
      this.userProfileService.getUserAddressDetails(this.auth.currentUser.id)
            .then(userAddress => this.userProfileForm.patchValue(userAddress));


    }


    // ** IMAGE CROPPER
    fileChangeEvent(event: any): void {
      this.displayDialog = true;

      this.imageChangedEvent = event;


  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // console.log('Just Cropped:', event);
    // console.log('Just Cropped 1:', this.croppedImage);
    // console.log(event.base64);



    /*

    this.userProfileForm = this.fb.group({

      photo: [this.croppedImage]

    });
    */
  }


  imageLoaded() {
    this.showCropper = true;
     // console.log('Image loaded');
  }


  cropperReady() {
    // console.log('Cropper ready');
  }
  loadImageFailed () {
    // console.log('Load failed');
  }
  rotateLeft() {
    this.imageCropper.rotateLeft();
  }
  rotateRight() {
    this.imageCropper.rotateRight();
  }
  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }
  flipVertical() {
    this.imageCropper.flipVertical();
  }

  save() {
    this.displayDialog = false;

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


    // ** IMAGE UPLOAD
    /*
    handleFileInput(file: FileList) {
      this.fileToUpload = file.item(0);

      // Show image preview
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = <File>event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    }
    */

    submit( ) {

      if (this.userProfileForm.valid) {
        // console.log(this.userProfileForm.value);

        //  USER DATA
        this.user['email'] = this.userProfileForm.value.email;

        // console.log(this.auth.currentUser.email);
        // console.log(this.user);  // ARRAY

        // this.auth.currentUser.id
        if (this.auth.currentUser.email !== this.user['email']) {

          let id = this.auth.currentUser.id;

          this.userProfileService.editUserEmail(id, this.user)
            .subscribe(response => {

              // console.log('SUCCESSFULLY UPDATED Email!');
              this.messages = [];
              // tslint:disable-next-line:max-line-length
              this.messages.push({severity: 'success', summary: 'Success Message', detail: 'User EMAIL has been updated successfully!' });


            },
              (error) => {
                this.error = error.error;
                console.log(this.error);
                this.messages = [];
                // tslint:disable-next-line:max-line-length
                this.messages.push({severity: 'error', summary: 'Error Message:', detail: 'ATTENTION: USER EMAIL FAILED TO UPDATE!!' });

            });

        } else {
          console.log('EMAIL: Do Nothing!');

        }



      }

          //  CREATE USERPROFILE DATA

          this.userProfileForm.value.photo = this.croppedImage;

          // console.log(this.userProfileForm.value.photo);


          /*
          this.userprofile1['gender'] = this.userProfileForm.value.gender;
          this.userprofile1['firstName'] = this.userProfileForm.value.firstName;
          this.userprofile1['lastName'] = this.userProfileForm.value.lastName;
          this.userprofile1['phoneHome'] = this.userProfileForm.value.phoneHome;
          this.userprofile1['mobile'] = this.userProfileForm.value.mobile;
          this.userprofile1['photo'] = this.userProfileForm.value.photo;
          this.userprofile1['birthdate'] = this.userProfileForm.value.birthdate;

          // console.log(this.userprofile1);
          */

          //  CREATE USER ADDRESS DATA  this.userAddress1
          this.userAddress['houseApNum'] = this.userProfileForm.value.houseApNum;
          this.userAddress['street'] = this.userProfileForm.value.street;
          this.userAddress['city'] = this.userProfileForm.value.city;
          this.userAddress['state'] = this.userProfileForm.value.state;
          this.userAddress['zip'] = this.userProfileForm.value.zip;
          this.userAddress['country'] = this.userProfileForm.value.country['name'];


          // console.log(this.userAddress);




      //  Check if USERPROFILE URL - userprofile/id exists
      this.userProfileService.getUserProfileDetailsValidation(this.auth.currentUser.id)
            .subscribe(
              (response) => {
                // console.log('UserProfile Exists!');

                // UPDATE USER PROFILE
                this.userProfileService.editUserProfile(this.auth.currentUser.id, this.userProfileForm.value)
                .subscribe(response => {

                  console.log('SUCCESSFULLY UPDATED USERPROFILE!');
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









  }
