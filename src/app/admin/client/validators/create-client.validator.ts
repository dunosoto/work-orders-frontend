import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConstanstEnum } from "src/app/shared/enums/constanst.enum";
import { MessageErrorValidator } from "src/app/shared/models/message-error-validator.model";

export abstract class CreateClientValidator {

  public formData!: FormGroup;


  public get firstName(): AbstractControl | null {
    return this.formData.get('firstName');
  }

  public get lastName(): AbstractControl | null {
    return this.formData.get('lastName');
  }

  public get phone(): AbstractControl | null {
    return this.formData.get('phone');
  }

  public get identityCard(): AbstractControl | null {
    return this.formData.get('identityCard');
  }

  public errorsMessages: MessageErrorValidator = {
    identityCard: [
      { type: 'required', message: 'Carnet de identidad es requerido' },
    ],
    firstName: [
      { type: 'required', message: 'Nombre es requerido' },
    ],
    lastName: [
      { type: 'required', message: 'Apellidos es requerido' },
    ],
    phone: [
      { type: 'required', message: 'Número de referencia es requerido' },
      { type: 'pattern', message: 'El número de referencia debe empezar por 4, 6 o 7' },
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 7' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 8' }
    ],

  }

  constructor(private _formBuilder: FormBuilder) {
    this._buildForm();
  }

  public abstract setterValuesToFormData(): void;

  private _buildForm(): void {
    const formDataControlsConfig: { [key: string]: any } = {
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      identityCard: ['', [Validators.required]],
      phone: ['',
        [
          Validators.required,
          Validators.pattern(ConstanstEnum.PATTERN_PHONE),
          Validators.pattern(ConstanstEnum.PATTERN_ONLY_NUMBER),
          Validators.minLength(7),
          Validators.maxLength(8)
        ]
      ],
    };
    this.formData = this._formBuilder.group(formDataControlsConfig);
  }
}
