import { Component, OnInit } from '@angular/core';

/* ----------  PRIME COMPONENTS ---------- */
import { SelectItem, Message } from 'primeng/components/common/api';
import { Column } from 'primeng/components/common/shared';

import { VocabularyTopic } from './vocabulary-topic';
import { VocabularyTopicService } from './shared/services/vocabulary-topic.service';
import { GrammarTopicService } from './shared/services/grammar-topic.service';
import { UnitService } from './shared/services/unit.service';
import { LessonService } from './shared/services/lesson.service';

@Component({
  selector: 'app-vocabulary-topic',
  templateUrl: './vocabulary-topic.component.html',
  styles: []
})
export class VocabularyTopicComponent implements OnInit {
  vocabularyTopics: VocabularyTopic[];
  vocabularyTopicsData: any;
  msgs: Message[] = [];
  // public editTrue;
  cols: any[];
  // selectedColumns: any[];
  columnOptions: SelectItem[];
  /* -------------------------------------------------------- */
  activeIndex: number = 0;
  vocabularyTopic: VocabularyTopic = new VocabularyTopic();
  // basicBrowsers: Browser[];
  // browsers: Browser[];
  selectedVocabularyTopic: VocabularyTopic;
  selectedVocabularyTopics: VocabularyTopic[];
  displayDialog: boolean;
  stacked: boolean;
  // newBrowser: boolean;
  newVocabularyTopic: boolean;
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

  // ----------------------  GRAMMARTOPIC DROPDOWN ------------------------//
  grammarTopics: any[];
  colGrammarTopic: any[];
  selectedGrammarTopic: SelectItem[];


  constructor(
    private vocabularyTopicService: VocabularyTopicService,
    private grammarTopicService: GrammarTopicService,
    private unitService: UnitService,
    private lessonService: LessonService
    //  private spinnerService: NgxSpinnerService,
    // private router: Router,
    // private activatedRoute: ActivatedRoute,

  ) {  }


  ngOnInit() {

    // this.getVocabularyTopicsList();

    this.vocabularyTopicService.getVocabularyTopic().then(vocabularyTopic => this.vocabularyTopics = vocabularyTopic);



    this.cols = [
      // { field: 'id', header: 'Id' },

      { field: 'user_id', header: 'User Id' },

      // { field: 'u_id', header: 'Unit Id' },
      // { field: 'lss_id', header: 'Lesson Id' },
      // { field: 'gt_id', header: 'GT Id' },  // GrammarTopic Id

      // { field: 'vt_topic', header: 'Topic Title', editable: true },

      { field: 'vtpt_id', header: 'Portuguese Topic', editable: true  },
      { field: 'vtes_id', header: 'Spanish Topic', editable: true  },
      { field: 'vtfr_id', header: 'French Topic', editable: true  },
      { field: 'vtja_id', header: 'Japanese Topic', editable: true  },
      { field: 'vtzh_id', header: 'Chinese Topic', editable: true  },

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

    /*  --- GRAMMAR TOPIC DROPDOWN --- */
    this.grammarTopicService.getGrammarTopic().then(
      (data) => {

        this.grammarTopics = data;

        // console.log('TEST 0 : ', this.levels.length);
        for (let i = 0; i < this.grammarTopics.length; i++) {
          this.colGrammarTopic.push({ label: this.grammarTopics[i].gt_description, value: this.grammarTopics[i].id });
        }
        // console.log('COLUMNS : ', this.colsLevels);
        this.selectedGrammarTopic = this.colGrammarTopic;

      },
      (error) => {
        console.log(error);
      }
    );

    this.grammarTopics = [];

    this.colGrammarTopic = [
      { label: 'Choose a Topic', value: null }
    ];
  }

  updateDropdown(data: { column: Column, data: any }): void {

    let vocabularyTopic = data;
    // console.log('updateDropdown -', vocabularyTopic);

    let id = vocabularyTopic['id'];
    // console.log('ID Accessed! ', id);

    this.vocabularyTopicService.editVocabularyTopic(id, vocabularyTopic)
      .subscribe(response => {
        // this.isLoading = false;
        // this.vocabularyTopic = response['data'];
      });

  }


  onEditComplete(event: { column: Column, data: any }): void {
    this.logs.push('onEditComplete -', JSON.stringify(event.data));
    // let data = JSON.stringify(event.data);
    let vocabularyTopic = event.data;
    console.log('onEditComplete -', vocabularyTopic);


    let id = vocabularyTopic.id;
    // console.log('ID Accessed! ', id);

    this.vocabularyTopicService.editVocabularyTopic(id, vocabularyTopic)
      .subscribe(response => {
        // this.isLoading = false;
        // this.vocabularyTopic = response['data'];
      });

  }


  addVocabularyTopic() {
    this.newVocabularyTopic = true;
    this.vocabularyTopic = new VocabularyTopic();
    this.displayDialog = true;
  }


  save() {
    let vocabularyTopics = [...this.vocabularyTopics];
    if (this.newVocabularyTopic) {
      // this.spinnerService.show();
      vocabularyTopics.push(this.vocabularyTopic);
      let data: any = this.vocabularyTopic;
      console.log('ADDED New VocabularyTopic!', data);
      // console.log('ADDED New VocabularyTopic!');
      /* ADD VocabularyTopic */
      this.vocabularyTopicService.addVocabularyTopic(data).subscribe(response => {
        // this.spinnerService.hide();
        // this.router.navigate(['/vocabularyTopic']);
        this.vocabularyTopicService.getVocabularyTopic().then(vocabularyTopic => this.vocabularyTopics = vocabularyTopic);
      });

    } else {

      vocabularyTopics.push(this.vocabularyTopic);
      let data: any = this.vocabularyTopic;
      console.log('UPDATED VocabularyTopic!', data);

    }

    this.vocabularyTopics = vocabularyTopics;
    this.vocabularyTopic = null;
    this.displayDialog = false;
  }


  delete(row) {
    // row = this.data[0];
    let id = row['id'];
    console.log(id);

    let index = this.findSelectedVocabularyTopicIndex();
    this.vocabularyTopics = this.vocabularyTopics.filter((val, i) => i !== index);
    this.vocabularyTopicsData = this.vocabularyTopics.indexOf(row);
    this.vocabularyTopics.splice(this.vocabularyTopicsData, 1);
    this.vocabularyTopicService.deleteVocabularyTopic(id).subscribe(response => {
      // this.growlAlertService.showSuccess("User Deleted Succefully");
      // this.getUsersList();
      // this.spinnerService.hide();
    });

  }


  findSelectedVocabularyTopicIndex(): number {
    return this.vocabularyTopics.indexOf(this.selectedVocabularyTopic);
  }

}
