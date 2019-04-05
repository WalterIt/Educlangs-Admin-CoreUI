import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* ----------  PRIME COMPONENTS ---------- */
import { SelectItem, Message } from 'primeng/components/common/api';
import { Column } from 'primeng/components/common/shared';

import { GrammarClass } from './grammarClass';
import { GrammarClassService } from './shared/services/grammar-class.service';

@Component({
  selector: 'app-grammar-class',
  templateUrl: './grammar-class.component.html',
  styles: []
})
export class GrammarClassComponent implements OnInit {
  grammarClasses: GrammarClass[];
  grammarClassesData: any;
  error: any;
  msgs: Message[] = [];
  messages: Message[] = [];
  // public editTrue;
  cols: any[];
  // selectedColumns: any[];
  columnOptions: SelectItem[];
  /* -------------------------------------------------------- */
  activeIndex: number = 0;
  grammarClass: GrammarClass = new GrammarClass();
  // basicBrowsers: Browser[];
  // browsers: Browser[];
  selectedGrammarClass: GrammarClass;
  selectedgrammarClasses: GrammarClass[];
  displayDialog: boolean;
  stacked: boolean;
  // newBrowser: boolean;
  newGrammarClass: boolean;
  // totalRecords: number = 100;
  // engines: SelectItem[];
  // grades: SelectItem[];
  // expandedRows: any[];

  // --------------------------------------------------------//

  logs: string[] = [];

  data: any = [];
  delRow;


  constructor(
    private grammarClassService: GrammarClassService,
    //  private spinnerService: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
        // this.getgrammarClassesList();

        this.grammarClassService.getGrammarClass().then(grammarClass => this.grammarClasses = grammarClass);
        // console.log(this.grammarClassService.getgrammarClass().then(grammarClass => this.grammarClasses = grammarClass));
  }

  ngOnInit() {

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'user_id', header: 'User Id' },
      { field: 'gc_id', header: 'gc_id' },
      { field: 'gc_class', header: 'gc_class' },
      { field: 'created_at', header: 'Creation' },
      { field: 'updated_at', header: 'Updated' }

    ];

    // this.selectedColumns = this.cols;
    this.columnOptions = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
    }
  }


  onEditComplete(event: { column: Column, data: any }): void {
    this.logs.push('onEditComplete -', JSON.stringify(event.data));
    // let data = JSON.stringify(event.data);
    let grammarClass = event.data;
    // console.log('onEditComplete -', grammarClass);


    let id = grammarClass.id;
    // console.log('ID Accessed! ', id);
    this.grammarClassService.editGrammarClass(id, grammarClass)
      .subscribe(response => {
        // this.isLoading = false;
        // this.grammarClass = response['data'];
      },
      (error) => {
        this.error = error.error;
        this.messages = [];

        if ((this.error['gc_id']) && (this.error['gc_class']) ) {
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['gc_id'] });
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['gc_class'] });

        } else{

              if (this.error['gc_id']) {
                this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['gc_id'] });
              } else {
                this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['gc_class'] });
              }
      }
      }

      );

  }


  addGrammarClass() {
    this.newGrammarClass = true;
    this.grammarClass = new GrammarClass();
    this.displayDialog = true;
  }


  save() {
    let grammarClasses = [...this.grammarClasses];
    if (this.newGrammarClass) {
      // this.spinnerService.show();
      grammarClasses.push(this.grammarClass);
      let data: any = this.grammarClass;
      // console.log('ADDED New GrammarClass!', data);
      // console.log('ADDED New GrammarClass!');
      /* ADD GrammarClass */
      this.grammarClassService.addGrammarClass(data).subscribe(response => {
        // this.spinnerService.hide();
        // this.router.navigate(['/grammarClass']);
        this.grammarClassService.getGrammarClass().then(grammarClass => this.grammarClasses = grammarClass);
      },
      (error) => {
        this.error = error.error;
        this.messages = [];

        if ((this.error['gc_id']) && (this.error['gc_class']) ) {
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['gc_id'] });
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['gc_class'] });
        } else {
              if (this.error['gc_id']) {
                this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['gc_id'] });
              } else {
                this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['gc_class'] });
              }
        }
      }
      );

    } else {
      // console.log('UPDATED GrammarClass!');
    }

    this.grammarClasses = grammarClasses;
    this.grammarClass = null;
    this.displayDialog = false;
  }


  delete(row) {
    // row = this.data[0];
    let id = row['id'];
    console.log(id);

    let index = this.findSelectedGrammarClassIndex();
    this.grammarClasses = this.grammarClasses.filter((val, i) => i !== index);
    this.grammarClassesData = this.grammarClasses.indexOf(row);
    this.grammarClasses.splice(this.grammarClassesData, 1);
    this.grammarClassService.deleteGrammarClass(id).subscribe(response => {
      // this.growlAlertService.showSuccess("User Deleted Succefully");
      // this.getUsersList();
      // this.spinnerService.hide();
    });


  }

  findSelectedGrammarClassIndex(): number {
    return this.grammarClasses.indexOf(this.selectedGrammarClass);
  }


  onRowSelectCRUD(event: any) {
    this.newGrammarClass = false;
    this.grammarClass = Object.assign({}, event.data);
    this.displayDialog = true;
  }

  selectGrammarClass(grammarClass: GrammarClass) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'GrammarClass selected', detail: 'GrammarClass: ' + grammarClass.gc_class });
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

