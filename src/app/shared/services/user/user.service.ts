import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { HttpClientService } from '../../bootstrap/htpp-client-service';
import { GetUserResponse, PostUser } from '../../models/user/user.model';
import { Response } from '../../models/response.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpClientService {

  private _endpoint: string;
  private _childrenRouteEndpoint: string;

  constructor(
    private _httpService: HttpService
  ) {
    super();
    this._endpoint = 'users';
    this._childrenRouteEndpoint = '';
  }

  public contextPath(): string {
    return this._endpoint;
  }

  public path(): string {
    return this._childrenRouteEndpoint;
  }

  public doGetAll(): Observable<GetUserResponse[]> {
    this._childrenRouteEndpoint = '';
    return this._httpService.get(this.getUrl())
      .pipe(
        map(
          (res: Response<GetUserResponse[]>) => res.data as GetUserResponse[]
        )
      );
  }

  public doPost(data: PostUser): Observable<GetUserResponse> {
    this._childrenRouteEndpoint = '';
    return this._httpService.post(this.getUrl(), data)
      .pipe(
        map(
          (res: Response<GetUserResponse>) => res.data as GetUserResponse
        )
      );
  }

  public doUpdate(data: PostUser, id: number): Observable<GetUserResponse> {
    this._childrenRouteEndpoint = '/' + id;
    return this._httpService.put(this.getUrl(), data)
      .pipe(
        map(
          (res: Response<GetUserResponse>) => res.data as GetUserResponse
        )
      );
  }

  public doDelete(idUser: number): Observable<GetUserResponse> {
    this._childrenRouteEndpoint = '/' + idUser;
    return this._httpService.delete(this.getUrl())
      .pipe(
        map(
          (res: Response<GetUserResponse>) => res.data as GetUserResponse
        )
      );
  }

}
