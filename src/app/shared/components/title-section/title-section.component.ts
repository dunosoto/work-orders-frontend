import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { ConnectState } from 'src/app/state-management/app.state';
import { ShowFilters } from '../../models/work-orders/global-show-filters.model';
import { Group } from '../../models/admin/group/group.model';
import { DateRangeWorkOrder } from '../../models/work-orders/work-order-date-range.model';
import { ConstanstEnum } from '../../enums/constanst.enum';

@Component({
  selector: 'app-title-section',
  templateUrl: './title-section.component.html',
  styleUrls: ['./title-section.component.scss']
})
export class TitleSectionComponent implements OnInit {

  @Input() public title!: string;
  @Input() public showFilters: ShowFilters;
  @Input() public showFiltersByVariantCategory: boolean = false;
  @Input() public categoriesItems!: any;
  @Input() public groups!: Group[] | null;
  @Output() public selectMonthByUser: EventEmitter<number | null>;
  @Output() public selectYearByUser: EventEmitter<number | null>;
  @Output() public selectCategoryItemByUser: EventEmitter<any>;
  @Output() public selectAreaByUser: EventEmitter<any>;
  @Output() public selectedFailureTypeByUser: EventEmitter<any>;
  @Output() public selectedDateRangeByUser: EventEmitter<DateRangeWorkOrder>;
  @Output() public selectGroupByUser: EventEmitter<Group>;

  public selectedYear: number;
  public selectedArea: any;
  public selectedGroup!: Group;
  public chosenYearDate: number = new Date().getFullYear();
  public date = new FormControl(moment());

  range = new FormGroup({
    start: new FormControl(moment(new Date()).subtract(2, 'd').format(ConstanstEnum.PATTERN_DATE_TO_QUERY)),
    end: new FormControl(new Date())
  });

  public areas = [
    {
      name: "Provisiones",
      value: 3
    }
  ];

  public months: any;
  public years: number[] = Array.from(new Array(20), (x, i) => i + 2014);;

  constructor(
    private _store: Store<ConnectState>
  ) {
    this.showFilters = {
      year: false,
      month: false,
      categoryItemPrice: false,
      location: false,
      groups: false,
      areas: false,
      dateRange: false,
      allYearSelected: true
    }
    this.selectedYear = new Date().getFullYear();
    this.selectMonthByUser = new EventEmitter();
    this.selectYearByUser = new EventEmitter();
    this.selectCategoryItemByUser = new EventEmitter();
    this.selectAreaByUser = new EventEmitter();
    this.selectedFailureTypeByUser = new EventEmitter();
    this.selectedArea = this.areas[0];
    this.selectedDateRangeByUser = new EventEmitter();
    this.selectGroupByUser = new EventEmitter(true);
    this.months = [
      {
        value: 1,
        name: 'Enero'
      },
      {
        value: 2,
        name: 'Febrero'
      },
      {
        value: 3,
        name: 'Marzo'
      },
      {
        value: 4,
        name: 'Abril'
      },
      {
        value: 5,
        name: 'Mayo'
      },
      {
        value: 6,
        name: 'Junio'
      },
      {
        value: 7,
        name: 'Julio'
      },
      {
        value: 8,
        name: 'Agosto'
      },
      {
        value: 9,
        name: 'Septiembre'
      },
      {
        value: 10,
        name: 'Octubre'
      },
      {
        value: 11,
        name: 'Noviembre'
      },
      {
        value: 12,
        name: 'Diciembre'
      }
    ];
  }

  ngOnInit(): void {
    this._initialize();

  }

  private _initialize(): void {
    if (this.groups) {
      this.selectGroupByUser.emit(this.groups[0]);
      this.selectedGroup = this.groups[0];
    }
  }

  public getSelectedRangeDate() {
    const dateRangeSelected: DateRangeWorkOrder = { 
      startDate: moment(this.range.value.start).format('YYYY-MM-DD'),
      endDate: moment(this.range.value.end).format('YYYY-MM-DD')
    }
    if (dateRangeSelected && dateRangeSelected.endDate !== 'Invalid date') {
      this.selectedDateRangeByUser.emit(dateRangeSelected);
    }
  }

  closeDatePicker(normalizedYear: Moment, elem: MatDatepicker<Moment>) {

    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year);
    this.date.setValue(ctrlValue);
    elem.close();
  }

}
