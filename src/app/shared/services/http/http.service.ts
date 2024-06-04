import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) {}
  get(serviceName: string): Observable < any > {
    const headers = new HttpHeaders({});

    const options = {
      headers: headers,
      withCredintials: false
    };
    const url = environment.apiUrl + serviceName;

    return this.httpClient.get(url, options);
  }

  delete(serviceName: string): Observable<any> {
    const headers = new HttpHeaders({});
    const options = {
      headers: headers,
      withCredintials: false
    };
    const url = environment.apiUrl + serviceName;

    return this.httpClient.delete(url, options);
  }

  post(serviceName: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: headers,
      withCredintials: false
    };
    const url = environment.apiUrl + serviceName;

    return this.httpClient.post(url, JSON.stringify(data), options);
  }

  put(serviceName: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      headers: headers,
      withCredintials: false
    };
    const url = environment.apiUrl + serviceName;

    return this.httpClient.put(url, JSON.stringify(data), options);
  }
}
