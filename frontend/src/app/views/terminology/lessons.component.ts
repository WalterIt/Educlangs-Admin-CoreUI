import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* ----------  PRIME COMPONENTS ---------- */
import { SelectItem, Message } from 'primeng/components/common/api';
import { Column } from 'primeng/components/common/shared';

import { Lesson } from './lesson';
import { LessonService } from './shared/services/lesson.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styles: []
})
export class LessonsComponent implements OnInit {
  lessons: Lesson[];
  lessonsData: any;
  msgs: Message[] = [];
  // public editTrue;
  cols: any[];
  // selectedColumns: any[];
  columnOptions: SelectItem[];
  /* -------------------------------------------------------- */
  activeIndex: number = 0;
  lesson: Lesson = new Lesson();
  // basicBrowsers: Browser[];
  // browsers: Browser[];
  selectedLesson: Lesson;
  selectedLessons: Lesson[];
  displayDialog: boolean;
  stacked: boolean;
  // newBrowser: boolean;
  newLesson: boolean;
  // totalRecords: number = 100;
  // engines: SelectItem[];
  // grades: SelectItem[];
  // expandedRows: any[];

  // --------------------------------------------------------//

  logs: string[] = [];

  data: any = [];
  delRow;


  constructor(
    private lessonService: LessonService,
    //  private spinnerService: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {

    // this.getLessonsList();

    this.lessonService.getLesson().then(lesson => this.lessons = lesson);
    // console.log(this.lessonService.getlesson().then(lesson => this.lessons = lesson));

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'user_id', header: 'User Id' },
      { field: 'l_id', header: 'l_id' },
      { field: 'lss_name', header: 'lss_name' },
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
    let lesson = event.data;
    // console.log('onEditComplete -', lesson);


    let id = lesson.id;
    // console.log('ID Accessed! ', id);
    this.lessonService.editLesson(id, lesson)
      .subscribe(response => {
        // this.isLoading = false;
        // this.lesson = response['data'];
      });

  }


  addLesson() {
    this.newLesson = true;
    this.lesson = new Lesson();
    this.displayDialog = true;
  }


  save() {
    let lessons = [...this.lessons];
    if (this.newLesson) {
      // this.spinnerService.show();
      lessons.push(this.lesson);
      let data: any = this.lesson;
      console.log('ADDED New Lesson!', data);
      // console.log('ADDED New Lesson!');
      /* ADD Lesson */
      this.lessonService.addLesson(data).subscribe(response => {
        // this.spinnerService.hide();
        // this.router.navigate(['/lesson']);
        this.lessonService.getLesson().then(lesson => this.lessons = lesson);
      });

    } else {

      console.log('UPDATED Lesson!');

    }

    this.lessons = lessons;
    this.lesson = null;
    this.displayDialog = false;
  }


  delete(row) {
    // row = this.data[0];
    let id = row['id'];
    console.log(id);

    let index = this.findSelectedLessonIndex();
    this.lessons = this.lessons.filter((val, i) => i !== index);
    this.lessonsData = this.lessons.indexOf(row);
    this.lessons.splice(this.lessonsData, 1);
    this.lessonService.deleteLesson(id).subscribe(response => {
      // this.growlAlertService.showSuccess("User Deleted Succefully");
      // this.getUsersList();
      // this.spinnerService.hide();
    });


  }


  onRowSelectCRUD(event: any) {
    this.newLesson = false;
    this.lesson = Object.assign({}, event.data);
    this.displayDialog = true;
  }
  findSelectedLessonIndex(): number {
    return this.lessons.indexOf(this.selectedLesson);
  }
  selectLesson(lesson: Lesson) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Lesson selected', detail: 'Lesson: ' + lesson.lss_name });
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
