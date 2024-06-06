import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _propertiesToShow!: SweetAlertOptions;
  private statusSuccessValue = new BehaviorSubject(false);

  constructor() { }

  public showMessageErrorClient(errorMessage: string, status: number): void {
    if (status === 0) {
      this._propertiesToShow = {
        icon: 'error',
        title: 'Error',
        text: 'Fallo en la conexión, verifica tu conexión a internet e intente nuevamente',
        showConfirmButton: true,
      }
    } else {
      this._propertiesToShow = {
        icon: 'error',
        title: 'Error en el navegador del cliente',
        text: 'Verifica que tu navegador tenga habilidado lo neceseario para utilizar el sistema',
        showConfirmButton: true,
      }
    }
    this.showSwalBasicAlert(this._propertiesToShow);
  }

  public showMessageErrorBackend(errorMessage: string, status: number): void {
    this._propertiesToShow = {
      icon: 'warning',
      title: 'Advertencia',
      text: JSON.stringify(errorMessage),
      showConfirmButton: true,
    }
    if (status === 401) {
      this._propertiesToShow = {
        icon: 'error',
        title: '!Oh oh... ocurrio un error!',
        text: 'Correo electronico/contraseña incorrectas, verifica que tus credenciales sean validas',
        showConfirmButton: true,
      }
      this.showSwalBasicAlert(this._propertiesToShow);
    } if (status === 422) {
      this.showSwalBasicAlert(this._propertiesToShow);
    }
    if (status === 400) {
      this.showSwalBasicAlert(this._propertiesToShow);
    }
  }

  public showSwalConfirmAlert(propertiesToShowFromComponent: SweetAlertOptions): Observable<boolean> {
    this._propertiesToShow = propertiesToShowFromComponent;
    this._propertiesToShow.icon = 'question';
    this._propertiesToShow.showCancelButton = true;
    return new Observable(
      (observer) => {
        Swal.fire(this._propertiesToShow).then((result) => {
          if (result.isConfirmed) {
            observer.next(true);
          } else {
            Swal.close();
            observer.next(false);
          }
        })

      }
    );
  }

  public catchStatusSuccess(httpResponse: HttpResponse<any>, httpMethod: string): void {
    if (httpMethod === 'DELETE' && httpResponse.status === 200) {
      this._propertiesToShow = {
        title: 'Eliminado correctamente!',
        text: JSON.stringify(httpResponse.body.message),
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500
      };
      this.showSwalBasicAlert(this._propertiesToShow);
      this.statusSuccessValue.next(true);
    }

    if (httpMethod === 'PUT' && (httpResponse.status === 200 || httpResponse.status === 201)) {
      this._propertiesToShow = {
        title: 'Actualizado correctamente!',
        text: JSON.stringify(httpResponse.body.message),
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500
      };
      this.showSwalBasicAlert(this._propertiesToShow);
      this.statusSuccessValue.next(true);
    }

    if (httpMethod === 'POST' && httpResponse.status === 201) {
      this._propertiesToShow = {
        title: 'Registrado correctamente!',
        text: JSON.stringify(httpResponse.body.message),
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500
      };
      this.showSwalBasicAlert(this._propertiesToShow);
      this.statusSuccessValue.next(true);
    }
  }

  public getStatusSuccess(): Observable<boolean> {
    return this.statusSuccessValue.asObservable();
  }

  public resetStatusSuccess(): void {
    this.statusSuccessValue.next(false);
  }

  public doGetIsConfirmed(): Observable<boolean> {
    return new Observable((observer) => {
      observer.next(true);
      observer.error('Has error');
    });
  }

  public showSwalBasicAlert(propertiesToShowFromComponent: SweetAlertOptions): void {
    Swal.fire(propertiesToShowFromComponent);
  }
}
