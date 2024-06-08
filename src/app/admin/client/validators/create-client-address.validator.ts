import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageErrorValidator } from "src/app/shared/models/message-error-validator.model";

export abstract class CreateClientAdressValidator {

  public formData!: FormGroup;

  public get client_id(): AbstractControl | null {
    return this.formData.get('client_id');
  }

  public get description(): AbstractControl | null {
    return this.formData.get('description');
  }

  constructor(private _formBuilder: FormBuilder) {
    this._buildForm();
  }

  public errorsMessages: MessageErrorValidator = {
    description: [
      { type: 'required', message: 'La descripción es obligatoria' },
    ]
  }

  public abstract setterValuesToFormData(): void;

  private _buildForm(): void {
    const formDataControlsConfig: { [key: string]: any } = {
      // client_name: ['', [Validators.required]],
      id: [],
      clientId: ['', [Validators.required]],
      placeId: ['', Validators.required],
      location: ['', [Validators.required]],
      lat: ['', [Validators.required]],
      lon: ['', Validators.required],
      city: ['', Validators.required],
      direction: ['', Validators.required],
      description: ['', [Validators.required]]
    };
    this.formData = this._formBuilder.group(formDataControlsConfig);
  }
}
