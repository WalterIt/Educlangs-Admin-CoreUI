import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* ----------  PRIME COMPONENTS ---------- */
import { SelectItem, Message } from 'primeng/components/common/api';
import { Column } from 'primeng/components/common/shared';

import { Level } from './level';
import { LevelService } from './shared/services/level.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styles: []
})
export class LevelsComponent implements OnInit {

  levels: level[];
  levelsData: any;
  msgs: Message[] = [];
  // public editTrue;
  cols: any[];
  // selectedColumns: any[];
  columnOptions: SelectItem[];
  /* -------------------------------------------------------- */
  activeIndex: number = 0;
  level: Level = new Level();
  // basicBrowsers: Browser[];
  // browsers: Browser[];
  selectedLevel: Level;
  selectedLevels: Level[];
  displayDialog: boolean;
  stacked: boolean;
  // newBrowser: boolean;
  newLevel: boolean;
  // totalRecords: number = 100;
  // engines: SelectItem[];
  // grades: SelectItem[];
  // expandedRows: any[];

  // --------------------------------------------------------//

  logs: string[] = [];

  data: any = [];
  delRow;


  constructor(
    private levelService: LevelService,
    //  private spinnerService: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {

    // this.getLevelsList();

    this.levelService.getLevel().then(level => this.levels = level);
    // console.log(this.levelService.getlevel().then(level => this.levels = level));

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'user_id', header: 'User Id' },
      { field: 'l_id', header: 'l_id' },
      { field: 'l_name', header: 'l_name' },
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
    let level = event.data;
    // console.log('onEditComplete -', level);


    let id = level.id;
    // console.log('ID Accessed! ', id);
    this.levelService.editLevel(id, level)
      .subscribe(response => {
        // this.isLoading = false;
        // this.level = response['data'];
      });

  }


  addLevel() {
    this.newLevel = true;
    this.level = new Level();
    this.displayDialog = true;
  }


  save() {
    let levels = [...this.levels];
    if (this.newLevel) {
      // this.spinnerService.show();
      levels.push(this.level);
      let data: any = this.level;
      console.log('ADDED New Level!', data);
      // console.log('ADDED New Level!');
      /* ADD Level */
      this.levelService.addLevel(data).subscribe(response => {
        // this.spinnerService.hide();
        // this.router.navigate(['/level']);
        this.levelService.getLevel().then(level => this.levels = level);
      });

    } else {

      console.log('UPDATED Level!');

    }

    this.levels = levels;
    this.level = null;
    this.displayDialog = false;
  }


  delete(row) {
    // row = this.data[0];
    let id = row['id'];
    console.log(id);

    let index = this.findSelectedLevelIndex();
    this.levels = this.levels.filter((val, i) => i !== index);
    this.levelsData = this.levels.indexOf(row);
    this.levels.splice(this.levelsData, 1);
    this.levelService.deleteLevel(id).subscribe(response => {
      // this.growlAlertService.showSuccess("User Deleted Succefully");
      // this.getUsersList();
      // this.spinnerService.hide();
    });


  }


  onRowSelectCRUD(event: any) {
    this.newLevel = false;
    this.level = Object.assign({}, event.data);
    this.displayDialog = true;
  }
  findSelectedLevelIndex(): number {
    return this.levels.indexOf(this.selectedLevel);
  }
  selectLevel(level: Level) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Level selected', detail: 'Level: ' + level.name });
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
