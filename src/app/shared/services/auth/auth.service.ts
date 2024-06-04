import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from '../http/http.service';
import { GetUserResponse, UserAuth, UserAuthResponse } from '../../models/user/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../../models/response.model';
import { AuthConstanst } from 'src/app/core/config/auth-constanst.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private _cookieService: CookieService
  ) { }

  login(credentials: UserAuth): Observable<UserAuthResponse> {
    return this.httpService.post('login', credentials)
    .pipe(
      map(
        (res: Response<UserAuthResponse>) =>  res.data as UserAuthResponse
        )
    );
	}

  logut(): Observable<any> {
    return this.httpService.post('logout', {})
    .pipe(
      map(
        (res: Response<UserAuthResponse>) =>  res.data as UserAuthResponse
        )
    );
	}

  getCurrentUser(): GetUserResponse {
    return JSON.parse(this._cookieService.get(AuthConstanst.USER));
  }
}
