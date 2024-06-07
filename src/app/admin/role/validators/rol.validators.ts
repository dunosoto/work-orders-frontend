import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

export abstract class RolValidators{
  public formData!: FormGroup;

  constructor(private _formBuilder: FormBuilder){
    this._builForm();
  }

  public get name(): AbstractControl | null{
    return this.formData.get('name');
  }

  public errorsMessages = {
    name: [
      { type: 'required', message: 'Nombre es requerido' },
      { type: 'maxlength', message: 'Solo se permite 100 caracteres' },
    ],
  }

  private _builForm(): void{
    this.formData = this._formBuilder.group({
      id: ['',[Validators.required]],
      name: ['',
        [
          Validators.required,
          Validators.maxLength(100)
        ]],
      prefix: ['',[Validators.required]]
    })
  }
}
