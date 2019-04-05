import { VocabularyTopic } from './../terminology/vocabulary-topic';
import { Component, OnInit } from '@angular/core';

/* ----------  PRIME COMPONENTS ---------- */
import { Message, SelectItem } from 'primeng/components/common/api';
import { Column } from 'primeng/components/common/shared';

import { Dicten } from './dicten';
import { DictenService } from './dicten.service';
import { GrammarClassService } from '../terminology/shared/services/grammar-class.service';
import { UnitService } from '../terminology/shared/services/unit.service';
import { LessonService } from '../terminology/shared/services/lesson.service';
import { VocabularyTopicService } from '../terminology/shared/services/vocabulary-topic.service';



@Component({
  selector: 'app-dicten',
  templateUrl: './dicten.component.html',
  styles: []
})
export class DictenComponent implements OnInit {
  dictens: Dicten[];
  dictensData: any;
  messages: Message[] = [];
  msgs: Message[] = [];
  error: any;
  // public editTrue;
  cols: any[];
  // selectedColumns: any[];
  columnOptions: SelectItem[];
  /* -------------------------------------------------------- */
  activeIndex: number = 0;
  dicten: Dicten = new Dicten();
  // basicBrowsers: Browser[];
  // browsers: Browser[];
  selectedDicten: Dicten;
  selectedDictens: Dicten[];
  displayDialog: boolean;
  stacked: boolean;
  // newBrowser: boolean;
  newDicten: boolean;
  // totalRecords: number = 100;
  // engines: SelectItem[];
  // grades: SelectItem[];
  // expandedRows: any[];

  // -------------------------------------------------------//
  logs: string[] = [];

  data: any = [];
  delRow;

  // ----------------------  UNITS ------------------------//
  units: any[];
  colUnit: any[];
  selectedUnit: SelectItem[];

  // ----------------------  LESSONS DROPDOWN ------------------------//
  lessons: any[];
  colLesson: any[];
  selectedLesson: SelectItem[];

  // ----------------------  GRAMMAR CLASS DROPDOWN ------------------------//
  grammarClass: any[];
  colGrammarClass: any[];
  selectedGrammarClass: SelectItem[];

  // ----------------------  VOCABULARYTOPIC DROPDOWN ------------------------//
  vocabularyTopic: any[];
  colVocabularyTopic: any[];
  selectedVocabularyTopic: SelectItem[];

  constructor(
    private dictenService: DictenService,
    private grammarClassService: GrammarClassService,
    private unitService: UnitService,
    private lessonService: LessonService,
    private vocabularyTopicService: VocabularyTopicService
    //  private spinnerService: NgxSpinnerService,
    // private router: Router,
    // private activatedRoute: ActivatedRoute,

  ) {  }


  ngOnInit() {

    // this.get'sList();

    this.dictenService.getDicten().then(dicten => this.dictens = dicten);



    this.cols = [
      // { field: 'id', header: 'Id' },
      { field: 'user_id', header: 'User Id' },
      { field: 'domain', header: 'Domain' },

      // { field: 'u_id', header: 'Unit Id' },
      // { field: 'vt_id', header: 'VT Id', editable: true },
      // { field: 'lss_id', header: 'Lesson Id' },
      // { field: 'gc_id', header: 'GC Id' },  // GrammarClass Id

      // { field: 'den_word', header: 'English Word', editable: true  },
      { field: 'dpt_word', header: 'Portuguese Word', editable: true  },
      { field: 'dfr_word', header: 'French Word', editable: true  },
      { field: 'des_word', header: 'Spanish Word', editable: true  },
      { field: 'dja_word', header: 'Japanese Word', editable: true  },
      { field: 'dzh_word', header: 'Chinese Word', editable: true  },

      { field: 'd_audio', header: 'Audio', editable: true  },
      { field: 'image', header: 'Image', editable: true  },

      { field: 'created_at', header: 'Creation' },
      { field: 'updated_at', header: 'Updated' }

    ];


    this.columnOptions = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
    }

    /*  --- UNIT DROPDOWN --- */
    this.unitService.getUnit().then(
      (data) => {

        this.units = data;

        // console.log('TEST 0 : ', this.levels.length);
        for (let i = 0; i < this.units.length; i++) {
          this.colUnit.push({ label: this.units[i].u_name, value: this.units[i].id });
        }
        // console.log('COLUMNS : ', this.colsLevels);
        this.selectedUnit = this.colUnit;

      },
      (error) => {
        console.log(error);
      }
    );

    this.units = [];

    this.colUnit = [
      { label: 'Select Unit', value: null }
      // {field : 'l_name', header: 'level Name'}
    ];

    /*  --- LESSONS DROPDOWN --- */
    this.lessonService.getLesson().then(
      (data) => {

        this.lessons = data;

        // console.log('TEST 0 : ', this.levels.length);
        for (let i = 0; i < this.lessons.length; i++) {
          this.colLesson.push({ label: this.lessons[i].lss_name, value: this.lessons[i].l_id });
        }
        // console.log('COLUMNS : ', this.colsLevels);
        this.selectedLesson = this.colLesson;

      },
      (error) => {
        console.log(error);
      }
    );

    this.lessons = [];

    this.colLesson = [
      { label: 'Select Lesson', value: null }
    ];

    /*  --- GRAMMAR CLASS DROPDOWN --- */
    this.grammarClassService.getGrammarClass().then(
      (data) => {

        this.grammarClass = data;

        // console.log('TEST 0 : ', this.levels.length);
        for (let i = 0; i < this.grammarClass.length; i++) {
          this.colGrammarClass.push({ label: this.grammarClass[i].gc_class, value: this.grammarClass[i].gc_id });
        }
        // console.log('COLUMNS : ', this.colsLevels);
        this.selectedGrammarClass = this.colGrammarClass;

      },
      (error) => {
        console.log(error);
      }
    );

    this.grammarClass = [];

    this.colGrammarClass = [
      { label: 'Choose a Topic', value: null }
    ];

    /*  --- VOCABULARY TOPIC DROPDOWN --- */
    this.vocabularyTopicService.getVocabularyTopic().then(
      (data) => {

        this.vocabularyTopic = data;

        // console.log('TEST 0 : ', this.levels.length);
        for (let i = 0; i < this.vocabularyTopic.length; i++) {
          this.colVocabularyTopic.push({ label: this.vocabularyTopic[i].vt_topic, value: this.vocabularyTopic[i].id });
        }
        // console.log('COLUMNS : ', this.colsLevels);
        this.selectedVocabularyTopic = this.colVocabularyTopic;

      },
      (error) => {
        console.log(error);
      }
    );

    this.vocabularyTopic = [];

    this.colVocabularyTopic = [
      { label: 'Choose a Topic', value: null }
    ];
  }

  updateDropdown(data: { column: Column, data: any }): void {

    let dicten = data;
    // console.log('updateDropdown -', dicten);

    let id = dicten['id'];
    // console.log('ID Accessed! ', id);

    this.dictenService.editDicten(id, dicten)
      .subscribe(response => {
        // this.isLoading = false;
        // this.dicten = response['data'];
      });

  }


  onEditComplete(event: { column: Column, data: any }): void {
    this.logs.push('onEditComplete -', JSON.stringify(event.data));
    // let data = JSON.stringify(event.data);
    let dicten = event.data;
    console.log('onEditComplete -', dicten);


    let id = dicten.id;
    // console.log('ID Accessed! ', id);

    this.dictenService.editDicten(id, dicten)
      .subscribe(response => {
        // this.isLoading = false;
        // this.dicten = response['data'];
      },
      (error) => {
        this.error = error.error;
        // this.msgs = this.error;
        this.messages = [];
        // console.log(this.error);
        if ((this.error['u_id'])) {
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['u_id'] });
        }
      }
      );

  }


  addDicten() {
    this.newDicten = true;
    this.dicten = new Dicten();
    this.displayDialog = true;
  }


  save() {
    let dictens = [...this.dictens];
    if (this.newDicten) {
      // this.spinnerService.show();
      dictens.push(this.dicten);
      let data: any = this.dicten;
      console.log('ADDED New Dicten!', data);
      // console.log('ADDED New Dicten!');
      /* ADD Dicten */
      this.dictenService.addDicten(data).subscribe(response => {
        // this.spinnerService.hide();
        // this.router.navigate(['/dicten']);
        this.dictenService.getDicten().then(dicten => this.dictens = dicten);
      },
      (error) => {
        this.error = error.error;
        // this.msgs = this.error;
        this.messages = [];
        // console.log(this.error);
        if ((this.error['u_id'])) {
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['u_id'] });
        }
      }
      );

    } else {

      dictens.push(this.dicten);
      let data: any = this.dicten;
      console.log('UPDATED Dicten!', data);

    }

    this.dictens = dictens;
    this.dicten = null;
    this.displayDialog = false;
  }


  delete(row) {
    // row = this.data[0];
    let id = row['id'];
    console.log(id);

    let index = this.findSelectedDictenIndex();
    this.dictens = this.dictens.filter((val, i) => i !== index);
    this.dictensData = this.dictens.indexOf(row);
    this.dictens.splice(this.dictensData, 1);
    this.dictenService.deleteDicten(id).subscribe(response => {
      // this.growlAlertService.showSuccess("User Deleted Succefully");
      // this.getUsersList();
      // this.spinnerService.hide();
    });

  }


  findSelectedDictenIndex(): number {
    return this.dictens.indexOf(this.selectedDicten);
  }

}
