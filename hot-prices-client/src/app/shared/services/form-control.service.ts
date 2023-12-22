import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }

  toggleFormControl<T>(form: FormGroup, controlName: string, condition: boolean, defaultValue?: T) {
    if (condition) {
      form.get(controlName)?.enable();
      form.get(controlName)?.setValue(defaultValue);
    } else {
      form.get(controlName)?.disable();
      form.get(controlName)?.setValue(null);

    }
  }

  transformFormArrayToRecord<T>(
    formArray: FormArray,
    initialRecord: Record<string, T> | null = null
  ): Record<string, T> | null {
    let record: Record<string, T> | null = initialRecord;
    const array = formArray.controls.map((control) => control.value);
    console.log(array);
    if (array.length > 0) {
      record = array.reduce(
        (acc: Record<string, T>, curr: { key: string; value: T }) => {
          if (curr.key && curr.value) {
            acc[curr.key] = curr.value;
          }
          return acc;
        },
        {} as Record<string, T>
      );
    }
    console.log(record);
    return record;
  }
}
