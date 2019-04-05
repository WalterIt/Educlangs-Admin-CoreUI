import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* ----------  PRIME COMPONENTS ---------- */
import { SelectItem, Message } from 'primeng/components/common/api';
import { Column } from 'primeng/components/common/shared';

import { Unit } from './unit';
import { UnitService } from './shared/services/unit.service';
import { Level } from './level';
import { LevelService } from './shared/services/level.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styles: []
})
export class UnitsComponent implements OnInit {
  units: Unit[];
  unitsData: any;
  msgs: Message[] = [];
  messages: Message[] = [];
  error: any;
  // public editTrue;
  cols: any[];
  // selectedColumns: any[];
  columnOptions: SelectItem[];
  /* -------------------------------------------------------- */
  activeIndex: number = 0;
  unit: Unit = new Unit();
  // basicBrowsers: Browser[];
  // browsers: Browser[];
  selectedUnit: Unit;
  selectedUnits: Unit[];
  displayDialog: boolean;
  stacked: boolean;
  // newBrowser: boolean;
  newUnit: boolean;
  // totalRecords: number = 100;
  // engines: SelectItem[];
  // grades: SelectItem[];
  // expandedRows: any[];

  // -------------------------------------------------------//

  logs: string[] = [];

  data: any = [];
  delRow;

  // ----------------------  LEVELS ------------------------//

  levels: Level[];
  colsLevels: any[];
  level: any[];

  levelTable: SelectItem[];


  constructor(
    private unitService: UnitService,
    private levelService: LevelService,
    //  private spinnerService: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {  }


  ngOnInit() {

    // this.getUnitsList();

    this.unitService.getUnit().then(unit => this.units = unit);


    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'user_id', header: 'User Id' },
      { field: 'u_name', header: 'Unit Name' },
      { field: 'l_id', header: 'Level Id' },
      { field: 'created_at', header: 'Creation' },
      { field: 'updated_at', header: 'Updated' }

    ];


    this.columnOptions = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
    }


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

  }

  updateDropdown(data: { column: Column, data: any }): void {

    let unit = data;
    // console.log('updateDropdown -', unit);

    let id = unit['id'];
    // console.log('ID Accessed! ', id);

    this.unitService.editUnit(id, unit)
      .subscribe(response => {
        // this.isLoading = false;
        // this.unit = response['data'];
      });

  }


  onEditComplete(event: { column: Column, data: any }): void {
    this.logs.push('onEditComplete -', JSON.stringify(event.data));
    // let data = JSON.stringify(event.data);
    let unit = event.data;
    // console.log('onEditComplete -', unit);

    let id = unit.id;
    // console.log('ID Accessed! ', id);

    this.unitService.editUnit(id, unit)
      .subscribe(response => {
        // this.isLoading = false;
        // this.unit = response['data'];
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


  addUnit() {
    this.newUnit = true;
    this.unit = new Unit();
    this.displayDialog = true;
  }


  save() {
    let units = [...this.units];
    if (this.newUnit) {
      // this.spinnerService.show();
      units.push(this.unit);
      let data: any = this.unit;
      console.log('ADDED New Unit!', data);
      // console.log('ADDED New Unit!');
      /* ADD Unit */
      this.unitService.addUnit(data).subscribe(response => {
        // this.spinnerService.hide();
        // this.router.navigate(['/unit']);
        this.unitService.getUnit().then(unit => this.units = unit);
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

      units.push(this.unit);
      let data: any = this.unit;
      console.log('UPDATED Unit!', data);

    }

    this.units = units;
    this.unit = null;
    this.displayDialog = false;
  }


  delete(row) {
    // row = this.data[0];
    let id = row['id'];
    console.log(id);

    let index = this.findSelectedUnitIndex();
    this.units = this.units.filter((val, i) => i !== index);
    this.unitsData = this.units.indexOf(row);
    this.units.splice(this.unitsData, 1);
    this.unitService.deleteUnit(id).subscribe(response => {
      // this.growlAlertService.showSuccess("User Deleted Succefully");
      // this.getUsersList();
      // this.spinnerService.hide();
    });

  }


  findSelectedUnitIndex(): number {
    return this.units.indexOf(this.selectedUnit);
  }


}
