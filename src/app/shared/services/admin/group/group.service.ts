import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/shared/bootstrap/htpp-client-service';
import { HttpService } from '../../http/http.service';
import { Group, GroupDelete, GroupPost } from 'src/app/shared/models/admin/group/group.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/app/shared/models/response.model';
import { BaseModel } from 'src/app/shared/models/base.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends HttpClientService{

  private _endpoint: string;
  private _childrenRouteEndpoint: string;

  constructor(
    private _httpService: HttpService,
    private _firestoreService: AngularFirestore
  ) {
    super();
    this._endpoint = 'groups';
    this._childrenRouteEndpoint = '';
  }

  public contextPath(): string {
    return this._endpoint;
  }

  public path(): string {
    return this._childrenRouteEndpoint;
  }

  public getAllGroups(): Observable<Group[]> {
    this._childrenRouteEndpoint = '';
    return this._httpService.get(this.getUrl())
      .pipe(
        map(
          (res: Response<Group[]>) => res.data as Group[]
        )
      );
  }

  public addGroup(data: GroupPost): Observable<Group> {
    return this._httpService.post(this.getUrl(), data)
      .pipe(
        map(
          (res: Response<Group>) => {
            return res.data as Group;
          }
        )
      );
  }

  public addToFire(data: Group): Promise<void> {
    return this._firestoreService.collection<Group>(this.getUrl()).doc(data.id + '').set(data);
  }

  public deleteGroup(id: number): Observable<GroupDelete> {
    this._childrenRouteEndpoint = '/' + id;
    return this._httpService.delete(this.getUrl())
      .pipe(
        map(
          (res: Response<GroupDelete>) => {
            this.deleteFromFire(id);
            return res.data as GroupDelete;
          }
        )
      )
  }

  public deleteFromFire(id: number): Promise<void> {
    return this._firestoreService.collection<Group>(this.getUrl()).doc(id + '').delete();
  }

  public editGroup(data: GroupPost, group: Group): Observable<Group> {
    this._childrenRouteEndpoint = '/' + group.id;
    return this._httpService.put(this.getUrl(), data)
      .pipe(
        map(
          (res: Response<Group>) => res.data as Group
        )
      );
  }

  public getOne(id: number): Observable<Group> {
    this._childrenRouteEndpoint = '/' + id;
    return this._httpService.get(this.getUrl())
      .pipe(
        map(
          (res: Response<Group>) => res.data as Group
        )
      );
  }

  public dropGroup(id: number): Observable<BaseModel> {
    this._childrenRouteEndpoint = `/${id}`;
    return this._httpService.delete(this.getUrl())
      .pipe(
        map(
          (res: Response<BaseModel>) => res.data as BaseModel
        )
      )
  }
}
