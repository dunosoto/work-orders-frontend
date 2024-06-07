import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataGlobalStore } from 'src/app/shared/models/admin/state-managment/data-global-store.model';
import { loadRoles } from 'src/app/state-management/actions/role/role.action';
import { selectListRoles, selectLoadingRoles } from 'src/app/state-management/selectors/role/role.selector';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RoleComponent implements OnInit {
  public dataGlobalStore: DataGlobalStore;
  public loading$: Observable<boolean> = new Observable();
  public textToSearch: string;

  constructor(
    private _store: Store<any>
  ) {
    this.loading$ = this._store.select(selectLoadingRoles);
    this.textToSearch = "";
    this.dataGlobalStore = {
      roles$: this._store.select(selectListRoles)
    };
  }

  public ngOnInit(): void {
  }

  public getTextToSearch(textToSearch: string): void {
    this.textToSearch = textToSearch;
  }

  public getAllRoles(): void {
    this._store.dispatch(loadRoles());
  }
}
