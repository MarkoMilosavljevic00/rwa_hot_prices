import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }

  toggleFormControl<T>(form: FormGroup, controlName: string, isActivated: boolean, defaultValue?: T) {
    if (isActivated) {
      form.get(controlName)?.enable();
      form.get(controlName)?.setValue(defaultValue);
    } else {
      form.get(controlName)?.disable();
      form.get(controlName)?.setValue(null);

    }
  }
}
