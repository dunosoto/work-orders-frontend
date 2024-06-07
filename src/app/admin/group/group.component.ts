import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Group } from 'src/app/shared/models/admin/group/group.model';
import { loadGroups } from 'src/app/state-management/actions/group/group.action';
import { ConnectState } from 'src/app/state-management/app.state';
import { selectListGroups } from 'src/app/state-management/selectors/group/group.selector';
import { AddGroupComponent } from './components/add-group/add-group.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupComponent implements OnInit {

  public groupDataList$!: Observable<Group[]>;
  public textToSearch: string;

  constructor(
    public dialog: MatDialog,
    private _store: Store<ConnectState>
  ) {
    this.groupDataList$ = this._store.select(selectListGroups);
    this.textToSearch = '';
  }

  public ngOnInit(): void {
  }

  public addGroup() {
    const dialogRef = this.dialog.open(AddGroupComponent, {
      width: '600px',
      height: '600px',
      // data: this.groupDataList$,
      panelClass: 'modal-form'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllGroups();
      }
      // this.reloadEventEmitter.emit(true);
    });
  }

  public getAllGroups() {
    this._store.dispatch(loadGroups());
  }

  public getSearchText(textToSearch: string): void {
    this.textToSearch = textToSearch;
  }
}
