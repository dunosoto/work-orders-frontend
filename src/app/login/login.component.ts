import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuth, UserAuthResponse } from '../shared/models/user/user.model';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { AuthService } from '../shared/services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../shared/services/message/message.service';
import { RouteService } from '../shared/services/route/route.service';
import { AuthConstanst } from '../core/config/auth-constanst.config';
import { ErrorsMessage } from '../shared/models/error.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  private _swalProperties: SweetAlertOptions;
  public showPassword = false;
  public passwordToggleIcon = 'visibility_off';

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _cookieService: CookieService,
    private _messageService: MessageService,
    private routeService: RouteService
  ) {
    this._swalProperties = {
      title: '¡Bienvenido!',
      icon: 'success',
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false
    };
    this.buildForm();
  }

  ngOnInit(): void {
    
  }

  public buildForm(): void{
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public login() {
    const data: UserAuth = this.loginForm.value;
    Swal.fire({
      title: 'Iniciando Sesión...!',
      html: 'Espere un momento, los datos se estan validando',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this._authService.login(data)
          .subscribe(
            (res: UserAuthResponse) => {
              this._cookieService.set(AuthConstanst.AUTH, res.token);
              this._cookieService.set(AuthConstanst.USER, JSON.stringify(res.user));
              this._cookieService.set(AuthConstanst.ROLE, JSON.stringify(res.user.role.name));
              this._messageService.showSwalBasicAlert(this._swalProperties);
              this.routeService.userRedirectTo(res.user);
            },
            (error: ErrorsMessage) => {
            }
          );
      },
      willClose: () => {
        // clearInterval(timerInterval)
      }
    }).then((result) => {
    })
  }

  public togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'visibility_off') {
      this.passwordToggleIcon = 'visibility';
    } else {
      this.passwordToggleIcon = 'visibility_off';
    }
  }
}
