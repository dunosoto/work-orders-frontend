import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Links } from '../../models/links.model';
import { map } from 'rxjs/operators';
import { GetLabelResonse } from '../../models/label.model';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getLinks():Observable<Links> {
    return this.httpClient.get<Links>("assets/json/links.json")
    .pipe(
      map(
        (res: any) => res as Links
      )
    );
  }

  getLabels():Observable<GetLabelResonse[]> {
    return this.httpClient.get<GetLabelResonse[]>("assets/json/labels.json")
    .pipe(
      map(
        (res: any) => res as GetLabelResonse[]
      )
    );
  }
}
