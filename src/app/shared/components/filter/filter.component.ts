import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { FilterModel } from '../../models/admin/filter.model';
import { FilterOption } from '../../models/admin/filter/filter.model';
import { ConnectState } from 'src/app/state-management/app.state';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

  @Input() buttonName!: string;
  @Input() showIconChange!: boolean;
  @Input() showInputSearch: boolean;
  @Input() showButonExportReport: boolean;
  @Input() secondButtonName!: string;
  @Input() firstIcon: string;
  @Input() secondIcon: string;
  @Input() filtersObject!: FilterModel[] | null;
  @Input() title!: string;
  @Input() placeholder: string;
  @Input() public buttonTriggerName!: string;
  @Input() public showFiltersByVariantCategory: boolean;
  @Output() buttonEventEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() secondButtonEventEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() changeViewButtonEventEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() searchEventEmitter: EventEmitter<string> = new EventEmitter();
  @Output() changeFilterEventEmitter: EventEmitter<string> = new EventEmitter();
  @Output() importKmlFileEventEmmiter: EventEmitter<any> = new EventEmitter();
  @Output() selectShowMapEventEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() public selectFailureTypeByUser: EventEmitter<any>;
  @Output() public selectedFilterByOltList: EventEmitter<{option: FilterOption | null, value?: string}>;
  @Output() public generateReportToWorkOrdersEventEmitter: EventEmitter<boolean> = new EventEmitter();

  public text: string;
  public changeIcon: boolean;
  public showMap: boolean = false;

  constructor(
    private _store: Store<ConnectState>
  ) {
    this.firstIcon = 'toc';
    this.secondIcon = 'grid_view';
    this.changeIcon = false;
    this.showInputSearch = true;
    this.showButonExportReport = false;
    this.placeholder = 'Search';
    this.text = '';
    this.showFiltersByVariantCategory = false;
    this.selectFailureTypeByUser = new EventEmitter();
    this.selectedFilterByOltList = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public searchEvent(): void {
    this.searchEventEmitter.emit(this.text);
  }

  valueChange(event: any) {
    this.changeFilterEventEmitter.emit(event);
  }

  public changeViewEvent(): void {
    this.changeIcon = !this.changeIcon;
    this.changeViewButtonEventEmitter.emit(this.changeIcon);
  }

  public showMapSelected(option: boolean): void {
    this.showMap = option;
    this.selectShowMapEventEmitter.emit(this.showMap);
  }

  openMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }

  closeMenu(menuTrigger: MatMenuTrigger){
    menuTrigger.closeMenu();
  }
}
