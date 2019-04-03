import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* ----------  PRIME COMPONENTS ---------- */
import { SelectItem, Message } from 'primeng/components/common/api';
import { Column } from 'primeng/components/common/shared';

import { User } from './user';
import { UserService } from './user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit { 

  users: User[];
  usersData: any;
  msgs: Message[] = [];
  // public editTrue;
  cols: any[];
  // selectedColumns: any[];
  columnOptions: SelectItem[];
  /* -------------------------------------------------------- */ 
  activeIndex: number = 0;
  user: User = new User();
  // basicBrowsers: Browser[];
  // browsers: Browser[];
  selectedUser: User;
  selectedUsers: User[];
  displayDialog: boolean;
  stacked: boolean;
  // newBrowser: boolean;
  newUser: boolean;
  // totalRecords: number = 100;
  // engines: SelectItem[];
  // grades: SelectItem[];
  // expandedRows: any[];

  // -------------------------------------------------------//

  logs: string[] = [];

  data: any = [];
  delRow;


  constructor(
    private userService: UserService,
    //  private spinnerService: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {  }


  ngOnInit() {

    // this.getUsersList();

    this.userService.getUser().then(user => this.users = user);


    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'status', header: 'Status' },
      { field: 'user_id', header: 'User Id' },
      { field: 'name', header: 'User Name' },
      { field: 'email', header: 'Email' },
      { field: 'password', header: 'Password' },
      { field: 'created_at', header: 'Creation' },
      { field: 'updated_at', header: 'Updated' }

    ];


    this.columnOptions = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
    }

  }

  updateDropdown(data: { column: Column, data: any }): void {

    let user = data;
    // console.log('updateDropdown -', user);

    let id = user['id'];
    // console.log('ID Accessed! ', id);

    this.userService.editUser(id, user)
      .subscribe(response => {
        // this.isLoading = false;
        // this.user = response['data'];
      });

  }


  onEditComplete(event: { column: Column, data: any }): void {
    this.logs.push('onEditComplete -', JSON.stringify(event.data));
    // let data = JSON.stringify(event.data);
    let user = event.data;
    console.log('onEditComplete -', user);


    let id = user.id;
    // console.log('ID Accessed! ', id);

    this.userService.editUser(id, user)
      .subscribe(response => {
        // this.isLoading = false;
        // this.user = response['data'];
      });

  }


  addUser() {
    this.newUser = true;
    this.user = new User();
    this.displayDialog = true;
  }


  save() {
    let users = [...this.users];
    if (this.newUser) {
      // this.spinnerService.show();
      users.push(this.user);
      let data: any = this.user;
      console.log('ADDED New User!', data);
      // console.log('ADDED New User!');
      /* ADD User */
      this.userService.addUser(data).subscribe(response => {
        // this.spinnerService.hide();
        // this.router.navigate(['/user']);
        this.userService.getUser().then(user => this.users = user);
      });

    } else {

      users.push(this.user);
      let data: any = this.user;
      console.log('UPDATED User!', data);

    }

    this.users = users;
    this.user = null;
    this.displayDialog = false;
  }


  delete(row) {
    // row = this.data[0];
    let id = row['id'];
    console.log(id);

    let index = this.findSelectedUserIndex();
    this.users = this.users.filter((val, i) => i !== index);
    this.usersData = this.users.indexOf(row);
    this.users.splice(this.usersData, 1);
    this.userService.deleteUser(id).subscribe(response => {
      // this.growlAlertService.showSuccess("User Deleted Succefully");
      // this.getUsersList();
      // this.spinnerService.hide();
    });

  }


  findSelectedUserIndex(): number {
    return this.users.indexOf(this.selectedUser);
  }

}
