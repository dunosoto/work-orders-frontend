import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/shared/bootstrap/htpp-client-service';
import { HttpService } from '../../http/http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paginator, Response } from 'src/app/shared/models/response.model';
import { ClientGet, ClientGetWithParams, ClientPost, ClientPut, GetClientCategory } from 'src/app/shared/models/admin/client/client.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClientAddress } from 'src/app/shared/models/admin/client/client-address.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends HttpClientService {
  private _endpoint: string;
  private _childrenRouteEndpoint: string;

  constructor(
    private httpService: HttpService,
    private _httpClient: HttpClient
  ) {
    super();
    this._endpoint = 'clients';
    this._childrenRouteEndpoint = '';
  }

  public contextPath(): string {
    return this._endpoint;
  }

  public path(): string {
    return this._childrenRouteEndpoint;
  }

  //TODO: add params to get with infinite scroll
  public doGetAll(paramsToSearch: ClientGetWithParams): Observable<Paginator<ClientGet[]>> {
    this._childrenRouteEndpoint = '';
    const apiUrl = environment.apiUrl + this._endpoint + this._childrenRouteEndpoint;
    let params = new HttpParams();
    if (paramsToSearch.name !== '') {
      params = params.set('name', paramsToSearch.name);
    }
    if (paramsToSearch.lastName !== '') {
      params = params.set('lastName', paramsToSearch.lastName);
    }

    return this._httpClient.get<Response<Paginator<ClientGet[]>>>(apiUrl, { params })
      .pipe(
        map(
          (res: Response<Paginator<ClientGet[]>>) => res.data as Paginator<ClientGet[]>
        )
      );

  }

  public doPost(data: ClientPost): Observable<ClientGet> {
    return this.httpService.post(this.getUrl(), data)
      .pipe(
        map(
          (res: Response<ClientGet>) => res.data as ClientGet
        )
      );
  }

  public doPut(data: ClientPut): Observable<ClientGet> {
    this._childrenRouteEndpoint = `/${data.id}`;
    return this.httpService.put(this.getUrl(), data)
      .pipe(
        map(
          (res: Response<ClientGet>) => res.data as ClientGet
        )
      );
  }

  public delete(client: ClientGet): Observable<ClientGet> {
    this._childrenRouteEndpoint = `/${client.id}`;
    return this.httpService.delete(this.getUrl())
      .pipe(
        map(
          (res: Response<ClientGet>) => res.data as ClientGet
        )
      )
  }

  public doGetById(id: number): Observable<ClientGet> {
    this._childrenRouteEndpoint = '/' + id;
    return this.httpService.get(this.getUrl())
      .pipe(
        map(
          (res: Response<ClientGet>) => res.data as ClientGet
        )
      );
  }

  public doGetAllCategories(): Observable<GetClientCategory[]> {
    return this.httpService.get('client-categories')
      .pipe(
        map(
          (res: Response<GetClientCategory[]>) => res.data as GetClientCategory[]
        )
      )
  }

  public doPostAddress(data: ClientAddress[]): Observable<ClientGet> {
    this._childrenRouteEndpoint = '/' + data[0].clientId + '/addresses';
    return this.httpService.post(this.getUrl(), data)
      .pipe(
        map(
          (res: Response<ClientGet>) => res.data as ClientGet
        )
      )
  }

  public doPutAddress(data: ClientAddress): Observable<ClientGet> {
    this._childrenRouteEndpoint = `/${data.clientId}/addresses/${data.id}`;
    return this.httpService.put(this.getUrl(), data)
      .pipe(
        map(
          (res: Response<ClientGet>) => res.data as ClientGet
        )
      )
  }
}