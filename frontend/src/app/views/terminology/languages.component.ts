import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* ----------  PRIME COMPONENTS ---------- */
import { SelectItem, Message } from 'primeng/components/common/api';
import { Column } from 'primeng/components/common/shared';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { Language } from './language';
import { LanguageService } from './shared/services/language.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styles: []
})
export class LanguagesComponent implements OnInit {
  languages: Language[];
  languagesData: any;
  msgs: Message[] = [];
  // public editTrue;
  cols: any[];
  // selectedColumns: any[];
  columnOptions: SelectItem[];
  /* -------------------------------------------------------- */
  activeIndex: number = 0;
  language: Language = new Language();
  // basicBrowsers: Browser[];
  // browsers: Browser[];
  selectedLanguage: Language;
  selectedLanguages: Language[];
  displayDialog: boolean;
  stacked: boolean;
  // newBrowser: boolean;
  newLanguage: boolean;
  // totalRecords: number = 100;
  // engines: SelectItem[];
  // grades: SelectItem[];
  // expandedRows: any[];

  // --------------------------------------------------------//

  logs: string[] = [];

  data: any = [];
  delRow;


  constructor(
    private languageService: LanguageService,
    //  private spinnerService: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {

    // this.getLanguagesList();

    this.languageService.getLanguage().then(language => this.languages = language);
    //  console.log(this.languageService.getLanguage().then(language => this.languages = language));

    this.cols = [
      { field: 'id', header: 'Id' },

      { field: 'user_id', header: 'User Id' },
      { field: 'name', header: 'Language' }
    ];

    // this.selectedColumns = this.cols;
    this.columnOptions = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
    }
  }


  /* TRY TO IMPLEMENT ADD NEW ROW
  addNew(){
    this.data.push({
      name: '',
      value: ''
    })
    this.data[this.data.length - 1].isEditable = true;
  }

  addLanguage() {
    this.newLanguage = true;
    this.language = new Language();
    this.language = {
      user_id: '',
      name: ''
    };

    /// this.displayDialog = true;

    this.cols = [
      { field: 'id', header: 'Id' },

      { field: 'user_id', header: 'User Id' },
      { field: 'name', header: 'Language' }
  ];
    this.columnOptions = [];
    for(let i = 0; i < this.cols.length; i++) {
        this.columnOptions.push({label: this.cols.header, value: this.cols});
    }
  }

  /*



/*  THIS METHOD IS RETURNING {data: Array(10), links: {…}, meta: {…}}

  getLanguagesList() {
    this.spinnerService.show();
    this.languageService.getListOfLanguages().subscribe(res => {
      this.languagesData = res;
      console.log(this.languagesData);
      // this.total = this.usersData.length;
      this.spinnerService.hide();
    });
  */


  /*
  onEdit(event: {originalEvent: any, column: Column, data: any}): void {
    this.logs.push('onEdit -', JSON.stringify(event.data));
    // console.log('onedit');
  }
  */

  onEditComplete(event: { column: Column, data: any }): void {
    this.logs.push('onEditComplete -', JSON.stringify(event.data));
    // let data = JSON.stringify(event.data);
    let data = event.data;
    console.log('onEditComplete -', data);

    this.languageService.editLanguage(data).subscribe(response => {
      // this.router.navigate(['/language']);
      // this.spinnerService.hide();
    });
  }


  addLanguage() {
    this.newLanguage = true;
    this.language = new Language();
    this.displayDialog = true;
  }


  save() {
    let languages = [...this.languages];
    if (this.newLanguage) {
      // this.spinnerService.show();
      languages.push(this.language);
      let data: any = this.language;
      console.log('ADDED New Language!', data);
      // console.log('ADDED New Language!');
      /* ADD LANGUAGE */
      this.languageService.addLanguage(data).subscribe(response => {
        // this.spinnerService.hide();
        // this.router.navigate(['/language']);
      });
    } else {
      languages[this.findSelectedLanguageIndex()] = this.language;
      /** BUG CROSS DOMAIN
      * Access to XMLHttpRequest at 'http://localhost:8000/api/language' from origin 'http://localhost:4200'
      * has been blocked by CORS policy: Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.
      */
      /* UPDATE LANGUAGE */
      let data1: any = this.language;
      console.log(data1);
      this.languageService.editLanguage(data1).subscribe(response => {
        // this.router.navigate(['language']);
        // this.spinnerService.hide();
      });
      // console.log(this.language);
      console.log('UPDATED Language!');
    }
    this.languages = languages;
    this.language = null;
    this.displayDialog = false;
  }


  delete(row) {
    // row = this.data[0];
    let id = row['id'];
    console.log(id);

    let index = this.findSelectedLanguageIndex();
    this.languages = this.languages.filter((val, i) => i !== index);
    this.languagesData = this.languages.indexOf(row);
    this.languages.splice(this.languagesData, 1);
    this.languageService.deleteLanguage(id).subscribe(response => {
      // this.growlAlertService.showSuccess("User Deleted Succefully");
      // this.getUsersList();
      // this.spinnerService.hide();
    });






  }



  /*
  delete() {
  this.spinnerService.show();
  let index = this.findSelectedLanguageIndex();
  this.languages = this.languages.filter( (val, i) => i !== index);
  /* DELETE LANGUAGE */
  /**
  * BUG DELETING
  * Access to XMLHttpRequest at 'http://localhost:8000/api/language/13' from origin 'http://localhost:4200'
  * has been blocked by CORS policy: Method DELETE is not allowed by Access-Control-Allow-Methods in preflight response.

  console.log(this.language);
  let id = this.language.id;
  // this.spinnerService.show();
  this.languageService.deleteLanguage(id).subscribe(response => {
  // this.growlAlertService.showSuccess("User Deleted Succefully");
  // this.getUsersList();
  this.spinnerService.hide();
  });


  this.language = null;
  this.displayDialog = false;
  }
*/

  onRowSelectCRUD(event: any) {
    this.newLanguage = false;
    this.language = Object.assign({}, event.data);
    this.displayDialog = true;
  }
  findSelectedLanguageIndex(): number {
    return this.languages.indexOf(this.selectedLanguage);
  }
  selectLanguage(language: Language) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Language selected', detail: 'Language: ' + language.name });
  }
  toggle() {
    this.stacked = !this.stacked;
  }
  onChangeStep(label: string) {
    this.msgs.length = 0;
    this.msgs.push({ severity: 'info', summary: label });
    console.log('changed');
  }


}
