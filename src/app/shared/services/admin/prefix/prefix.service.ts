import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import { HttpClientService } from 'src/app/shared/bootstrap/htpp-client-service';
import { Prefix } from 'src/app/shared/models/admin/prefix/prefix.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/app/shared/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class PrefixService extends HttpClientService {

  private _endpoint: string;
  private _childrenRouteEndpoint: string;

  constructor(
    private httpService: HttpService
  ) {
    super();
    this._endpoint = 'groups/create';
    this._childrenRouteEndpoint = '';
  }

  public contextPath(): string {
    return this._endpoint;
  }

  public path(): string {
    return this._childrenRouteEndpoint;
  }


  getPrefix(): Observable<Prefix>{
    return this.httpService.get(this.getUrl())
    .pipe(
      map(
        (res: Response<Prefix>) => res.data as Prefix
      )
    )
  }
}
