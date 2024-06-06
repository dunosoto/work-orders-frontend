import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConstanstEnum } from "src/app/shared/enums/constanst.enum";

export abstract class UserValidator {
  public formData!: FormGroup;

  public get name(): AbstractControl | null {
    return this.formData.get('name');
  }
  public get lastName(): AbstractControl | null {
    return this.formData.get('last_name')
  }
  public get cellPhone(): AbstractControl | null {
    return this.formData.get('cell_phone')
  }
  public get email(): AbstractControl | null {
    return this.formData.get('email')
  }
  public get password(): AbstractControl | null {
    return this.formData.get('password')
  }
  public get passwordConfirm(): AbstractControl | null {
    return this.formData.get('password_confirmation')
  }

  public errorsMessages = {
    name: [
      { type: 'required', message: 'Nombre es requerido' },
      { type: 'pattern', message: 'Solo se permiten letras' },
      { type: 'minlength', message: '3 caracteres como mínimo' }
    ],
    lastName: [
      { type: 'required', message: 'Los apellidos son requeridos' },
      { type: 'pattern', message: 'Solo se permiten letras' },
      { type: 'minlength', message: '3 caracteres como mínimo' }
    ],
    cellPhone: [
      { type: 'required', message: 'El número de celular es requerido' },
      { type: 'pattern', message: 'Solo se permiten números y con el formato: 6xxxx ó 7xxxx' },
      { type: 'maxlength', message: '8 caracteres como máximo' },
      { type: 'minlength', message: '8 caracteres como mínimo' }
    ],
    email: [
      { type: 'required', message: 'El correo electrónico es requerido' },
      { type: 'email', message: 'El correo sigue el formato: example@example.com' },
      { type: 'maxlength', message: '15 caracteres como máximo' },
      { type: 'minlength', message: '2 caracteres como mínimo' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es requerida' },
      { type: 'maxlength', message: '15 caracteres como máximo' },
      { type: 'minlength', message: '8 caracteres como mínimo' }
    ],
    passwordConfirm: [
      { type: 'required', message: 'La confirmación de contraseña es requerida' },
      { type: 'maxlength', message: '15 caracteres como máximo' },
      { type: 'minlength', message: '8 caracteres como mínimo' }
    ],
  }

  constructor(private _formBuilder: FormBuilder) {
    this._buildForm();
  }

  private _buildForm(): void {
    this.formData = this._formBuilder.group({
      name: ['',
        [
          Validators.required,
          Validators.pattern(ConstanstEnum.PATTERN_ONLY_TEXT),
          Validators.minLength(3)
        ]
      ],
      last_name: ['',
        [
          Validators.required,
          Validators.pattern(ConstanstEnum.PATTERN_ONLY_TEXT),
          Validators.minLength(3)
        ]
      ],
      cell_phone: ['',
        [
          Validators.required,
          Validators.pattern(ConstanstEnum.PATTERN_PHONE),
          Validators.maxLength(8),
          Validators.maxLength(8),
        ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(3)
        ]
      ],
      password_confirmation: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15)
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15)
        ]
      ],
      role_name: ['',
        [
          Validators.required
        ]
      ],
      role_id: ['',
        [
          Validators.required
        ]
      ],
      areas: [[],
      [
        Validators.required
      ]
      ],
      company_id: ['',
        [
          Validators.required
        ]
      ],
      company_name: ['',
        [
          Validators.required
        ]
      ],
      avatar: ['',],
    });
  }
}
