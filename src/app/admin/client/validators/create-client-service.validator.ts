import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConstanstEnum } from "src/app/shared/enums/constanst.enum";
import { MessageErrorValidator } from "src/app/shared/models/message-error-validator.model";

export abstract class CreateClientServiceValidator {

  public formData!: FormGroup;

  public get type_name(): AbstractControl | null {
    return this.formData.get('type_name');
  }

  public get access_name(): AbstractControl | null {
    return this.formData.get('access_name');
  }

  public get observation(): AbstractControl | null {
    return this.formData.get('observation');
  }


  public errorsMessages: MessageErrorValidator = {
    typeName: [
      { type: 'required', message: 'Tipo de servicio es requerido' },
    ],
    accessName: [
      { type: 'required', message: 'Tipo de accesso es requerido' },
    ],
    olt: [
      { type: 'required', message: 'OLT es requerido' },
      { type: 'minlength', message: 'OLT minimo es' },

    ],
    box: [
      { type: 'required', message: 'Caja par par es requerido' },
    ],
    observation: [
      { type: 'required', message: 'Observación es requerido' },
    ],
  }

  constructor(private _formBuilder: FormBuilder) {
    const formDataControlsConfig: { [key: string]: any } = {
      addressId: ['', [Validators.required]],
      typeId: ['', [Validators.required]],
      typeName: ['', [Validators.required]],
      accessId: ['', [Validators.required]],
      accessName: ['', [Validators.required]],
      technicalDatas: [[]],
      observation: ['', [Validators.required]],
    };
    this.formData = this._formBuilder.group(formDataControlsConfig);
  }

  public abstract setterValuesToFormData(): void;

  private _buildForm(): void {

  }

  // public abstract generateFormArray(): void;

}
