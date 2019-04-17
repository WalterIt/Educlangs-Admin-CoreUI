import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/* ----------  PRIME COMPONENTS ---------- */
import { SelectItem, Message } from 'primeng/components/common/api';
import { Column } from 'primeng/components/common/shared';

import { UserProfile } from './user-profile';
import { UserAddress } from './user-address';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: []
})
export class UserProfileComponent implements OnInit {
  userProfiles: UserProfile[];
  userAddresses: UserAddress[];
  userProfilesData: any;
  msgs: Message[] = [];
  messages: Message[] = [];
  error: any;
  // public editTrue;
  cols: any[];
  // selectedColumns: any[];
  columnOptions: SelectItem[];
  /* -------------------------------------------------------- */
  activeIndex: number = 0;
  userProfile: UserProfile = new UserProfile();
  userAddress: UserAddress = new UserAddress();


  // basicBrowsers: Browser[];
  // browsers: Browser[];
  selectedUserProfile: UserProfile;
  selectedUserProfiles: UserProfile[];
  displayDialog: boolean;
  stacked: boolean;
  // newBrowser: boolean;
  newUserProfile: boolean;
  // totalRecords: number = 100;
  // engines: SelectItem[];
  // grades: SelectItem[];
  // expandedRows: any[];

  // -------------------------------------------------------//

  logs: string[] = [];

  data: any = [];
  delRow;

  // ----------------------  LEVELS ------------------------//
/*
  levels: Level[];
  colsLevels: any[];
  level: any[];

  levelTable: SelectItem[];
*/


  constructor(
    private userProfileService: UserProfileService,
    // private levelService: LevelService,
    //  private spinnerService: NgxSpinnerService,
    // private router: Router,
    // private activatedRoute: ActivatedRoute,

  ) {  }


  ngOnInit() {

    // this.getUserProfilesList();

    this.userProfileService.getUserProfile().then(userProfile => this.userProfiles = userProfile);


    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'user_id', header: 'User Id' },
      { field: 'u_name', header: 'UserProfile Name' },
      { field: 'l_id', header: 'Level Id' },
      { field: 'created_at', header: 'Creation' },
      { field: 'updated_at', header: 'Updated' }

    ];


    this.columnOptions = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
    }


    /*
    this.levelService.getLevel().then(
      (data) => {

        this.levels = data;

        // console.log('TEST 0 : ', this.levels.length);

        for (let i = 0; i < this.levels.length; i++) {
          this.colsLevels.push({ label: this.levels[i].l_name, value: this.levels[i].l_id });
        }
        // console.log('COLUMNS : ', this.colsLevels);

        this.levelTable = this.colsLevels;

      },
      (error) => {
        console.log(error);
      }
    );


    this.levels = [];

    this.colsLevels = [
      { label: 'Select Level*', value: null }
      // {field : 'l_name', header: 'level Name'}
    ];
    */

  }

  /*
  updateDropdown(data: { column: Column, data: any }): void {

    let userProfile = data;
    // console.log('updateDropdown -', userProfile);

    let id = userProfile['id'];
    // console.log('ID Accessed! ', id);

    this.userProfileService.editUserProfile(id, userProfile)
      .subscribe(response => {
        // this.isLoading = false;
        // this.userProfile = response['data'];
      });

  }
  */



  onEditComplete(event: { column: Column, data: any }): void {
    this.logs.push('onEditComplete -', JSON.stringify(event.data));
    // let data = JSON.stringify(event.data);
    let userProfile = event.data;
    // console.log('onEditComplete -', userProfile);

    let id = userProfile.id;
    // console.log('ID Accessed! ', id);

    this.userProfileService.editUserProfile(id, userProfile)
      .subscribe(response => {
        // this.isLoading = false;
        // this.userProfile = response['data'];
      },
      (error) => {
        this.error = error.error;
        this.messages = [];

        if ((this.error['l_id']) && (this.error['u_name'])) {
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['l_id'] });
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['u_name'] });

        } else if (this.error['l_id']) {
                this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['l_id'] });
        } else {
                this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['u_name'] });
        }
      }
      );

  }


  addUserProfile() {
    this.newUserProfile = true;
    this.userProfile = new UserProfile();
    this.displayDialog = true;
  }


  save() {
    let userProfiles = [...this.userProfiles];
    if (this.newUserProfile) {
      // this.spinnerService.show();
      userProfiles.push(this.userProfile);
      let data: any = this.userProfile;
      console.log('ADDED New UserProfile!', data);
      // console.log('ADDED New UserProfile!');
      /* ADD UserProfile */
      this.userProfileService.addUserProfile(data).subscribe(response => {
        // this.spinnerService.hide();
        // this.router.navigate(['/userProfile']);
        this.userProfileService.getUserProfile().then(userProfile => this.userProfiles = userProfile);
      },
      (error) => {
        this.error = error.error;
        this.messages = [];

        if ((this.error['l_id']) && (this.error['u_name'])) {
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['l_id'] });
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['u_name'] });

        } else if (this.error['l_id']) {
                this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['l_id'] });
        } else {
                this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['u_name'] });
        }
      }
      );

    } else {

      userProfiles.push(this.userProfile);
      let data: any = this.userProfile;
      console.log('UPDATED UserProfile!', data);

    }

    this.userProfiles = userProfiles;
    this.userProfile = null;
    this.displayDialog = false;
  }


  delete(row) {
    // row = this.data[0];
    let id = row['id'];
    console.log(id);

    let index = this.findSelectedUserProfileIndex();
    this.userProfiles = this.userProfiles.filter((val, i) => i !== index);
    this.userProfilesData = this.userProfiles.indexOf(row);
    this.userProfiles.splice(this.userProfilesData, 1);
    this.userProfileService.deleteUserProfile(id).subscribe(response => {
      // this.growlAlertService.showSuccess("User Deleted Succefully");
      // this.getUsersList();
      // this.spinnerService.hide();
    });

  }


  findSelectedUserProfileIndex(): number {
    return this.userProfiles.indexOf(this.selectedUserProfile);
  }


}
