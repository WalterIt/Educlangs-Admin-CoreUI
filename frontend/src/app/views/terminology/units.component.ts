import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/* ----------  PRIME COMPONENTS ---------- */
import { SelectItem, Message } from 'primeng/components/common/api';
import { Column } from 'primeng/components/common/shared';

import { Unit } from './unit';
import { UnitService } from './shared/services/unit.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styles: []
})
export class UnitsComponent implements OnInit {
  units: Unit[];
  unitsData: any;
  msgs: Message[] = [];
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

  // --------------------------------------------------------//

  logs: string[] = [];

  data: any = [];
  delRow;


  constructor(
    private unitService: UnitService,
    //  private spinnerService: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {

    // this.getUnitsList();

    this.unitService.getUnit().then(unit => this.units = unit);
    // console.log(this.unitService.getUnit().then(unit => this.units = unit));

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'user_id', header: 'User Id' },
      { field: 'u_name', header: 'Unit Name' },
      { field: 'l_id', header: 'Level Id' },
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
    let unit = event.data;
    // console.log('onEditComplete -', unit);


    let id = unit.id;
    // console.log('ID Accessed! ', id);
    this.unitService.editUnit(id, unit)
      .subscribe(response => {
        // this.isLoading = false;
        // this.unit = response['data'];
      });

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
      });

    } else {

      console.log('UPDATED Unit!');

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


  onRowSelectCRUD(event: any) {
    this.newUnit = false;
    this.unit = Object.assign({}, event.data);
    this.displayDialog = true;
  }
  findSelectedUnitIndex(): number {
    return this.units.indexOf(this.selectedUnit);
  }
  selectUnit(unit: Unit) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Unit selected', detail: 'Unit: ' + unit.u_name });
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
