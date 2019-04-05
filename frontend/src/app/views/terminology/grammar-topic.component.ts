import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* ----------  PRIME COMPONENTS ---------- */
import { SelectItem, Message } from 'primeng/components/common/api';
import { Column } from 'primeng/components/common/shared';

import { GrammarTopic } from './grammar-topic';
import { GrammarTopicService } from './shared/services/grammar-topic.service';
import { UnitService } from './shared/services/unit.service';
import { LessonService } from './shared/services/lesson.service';


@Component({
  selector: 'app-grammar-topic',
  templateUrl: './grammar-topic.component.html',
  styles: []
})
export class GrammarTopicComponent implements OnInit {
  grammarTopics: GrammarTopic[];
  grammarTopicsData: any;
  messages: Message[] = [];
  error: any;
  cols: any[];
  // selectedColumns: any[];
  columnOptions: SelectItem[];
  /* -------------------------------------------------------- */
  activeIndex: number = 0;
  grammarTopic: GrammarTopic = new GrammarTopic();

  selectedGrammarTopic: GrammarTopic;
  selectedGrammarTopics: GrammarTopic[];
  displayDialog: boolean;
  stacked: boolean;
  // newBrowser: boolean;
  newGrammarTopic: boolean;


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


  constructor(
    private grammarTopicService: GrammarTopicService,
    private unitService: UnitService,
    private lessonService: LessonService,
    //  private spinnerService: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {  }


  ngOnInit() {

    // this.getGrammarTopicsList();

    this.grammarTopicService.getGrammarTopic().then(grammarTopic => this.grammarTopics = grammarTopic);



    this.cols = [
      // { field: 'id', header: 'Id' },
      { field: 'user_id', header: 'User Id' },
      // { field: 'u_id', header: 'Unit Id' },
      // { field: 'l_id', header: 'Lesson Id' },
      // { field: 'gt_description', header: 'Description' },
      { field: 'gr_explanation', header: 'Explanation', editable: true },
      { field: 'examples', header: 'Examples', editable: true },
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
      { label: 'Select Unit*', value: null }
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
      { label: 'Select Lesson*', value: null }
      // {field : 'l_name', header: 'level Name'}
    ];

  }

  updateDropdown(data: { column: Column, data: any }): void {

    let grammarTopic = data;
    // console.log('updateDropdown -', grammarTopic);

    let id = grammarTopic['id'];
    // console.log('ID Accessed! ', id);

    this.grammarTopicService.editGrammarTopic(id, grammarTopic)
      .subscribe(response => {
        // this.isLoading = false;
        // this.grammarTopic = response['data'];
      });

  }


  onEditComplete(event: { column: Column, data: any }): void {
    this.logs.push('onEditComplete -', JSON.stringify(event.data));
    // let data = JSON.stringify(event.data);
    let grammarTopic = event.data;
    console.log('onEditComplete -', grammarTopic);


    let id = grammarTopic.id;
    // console.log('ID Accessed! ', id);

    this.grammarTopicService.editGrammarTopic(id, grammarTopic)
      .subscribe(response => {
        // this.isLoading = false;
        // this.grammarTopic = response['data'];
      },
      (error) => {
        this.error = error.error;
        this.messages = [];

        if ((this.error['u_id']) && (this.error['l_id']) &&  (this.error['gt_description'])) {
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['u_id'] });
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['l_id'] });
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['gt_description'] });

        } else if (this.error['u_id']) {
                this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['u_id'] });
        } else if (this.error['l_id']) {
                this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['l_id'] });
        } else {
                this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['gt_description'] });
        }
      }
      );

  }


  addGrammarTopic() {
    this.newGrammarTopic = true;
    this.grammarTopic = new GrammarTopic();
    this.displayDialog = true;
  }


  save() {
    let grammarTopics = [...this.grammarTopics];
    if (this.newGrammarTopic) {
      // this.spinnerService.show();
      grammarTopics.push(this.grammarTopic);
      let data: any = this.grammarTopic;
      console.log('ADDED New GrammarTopic!', data);
      // console.log('ADDED New GrammarTopic!');
      /* ADD GrammarTopic */
      this.grammarTopicService.addGrammarTopic(data).subscribe(response => {
        // this.spinnerService.hide();
        // this.router.navigate(['/grammarTopic']);
        this.grammarTopicService.getGrammarTopic().then(grammarTopic => this.grammarTopics = grammarTopic);
      },
      (error) => {
        this.error = error.error;
        this.messages = [];

        if ((this.error['u_id']) && (this.error['l_id']) &&  (this.error['gt_description'])) {
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['u_id'] });
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['l_id'] });
          this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['gt_description'] });

        } else if (this.error['u_id']) {
                this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['u_id'] });
        } else if (this.error['l_id']) {
                this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['l_id'] });
        } else {
                this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['gt_description'] });
        }
      });

    } else {

      grammarTopics.push(this.grammarTopic);
      let data: any = this.grammarTopic;
      console.log('UPDATED GrammarTopic!', data);

    }

    this.grammarTopics = grammarTopics;
    this.grammarTopic = null;
    this.displayDialog = false;
  }


  delete(row) {
    // row = this.data[0];
    let id = row['id'];
    console.log(id);

    let index = this.findSelectedGrammarTopicIndex();
    this.grammarTopics = this.grammarTopics.filter((val, i) => i !== index);
    this.grammarTopicsData = this.grammarTopics.indexOf(row);
    this.grammarTopics.splice(this.grammarTopicsData, 1);
    this.grammarTopicService.deleteGrammarTopic(id).subscribe(response => {
      // this.growlAlertService.showSuccess("User Deleted Succefully");
      // this.getUsersList();
      // this.spinnerService.hide();
    });

  }


  findSelectedGrammarTopicIndex(): number {
    return this.grammarTopics.indexOf(this.selectedGrammarTopic);
  }

}
