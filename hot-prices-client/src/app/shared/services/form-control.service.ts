import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Validity } from 'src/app/common/interfaces/validity.interface';

@Injectable({
  providedIn: 'root',
})
export class FormControlService {
  constructor() {}

  toggleValidatorToKeyValueFormGroup(
    formGroup: FormGroup,
    validators: ((
      control: AbstractControl<any, any>
    ) => ValidationErrors | null)[]
  ) {
    const keyControl = formGroup.get('key') as FormControl;
    const valueControl = formGroup.get('value') as FormControl;

    if (keyControl.value || valueControl.value) {
      keyControl.setValidators(validators);
      valueControl.setValidators(validators);
      formGroup.markAllAsTouched();
    } else {
      keyControl.clearValidators();
      valueControl.clearValidators();
    }
    keyControl.updateValueAndValidity();
    valueControl.updateValueAndValidity();
    // form.updateValueAndValidity();
  }

  addRecordFromFormGroup(formGroup: FormGroup, recordControl: FormControl) {
    const newRecord = {
      [formGroup.value.key]: formGroup.value.value,
    };
    
    recordControl?.setValue({
      ...recordControl.value,
      ...newRecord,
    });

    formGroup.disable();
  }

  addFormGroupToFormArray(formArray: FormArray, key?: string, value?: string | number) {
    const spec = new FormGroup({
      key: new FormControl(key ?? ''),
      value: new FormControl(value ?? ''),
    });
    formArray.push(spec);
  }

  checkKeyValueFormGroupValidity(
    formArray: FormArray,
    formGroup: FormGroup,
    record: Record<string, string | number>,
    limit: number
  ): Validity {
    const keyValue = formGroup.get('key')?.value;
    if (record.hasOwnProperty(keyValue))
      return {
        isValid: false,
        message: {
          severity: 'error',
          summary: 'Invalid input',
          detail: `Specification with key ${keyValue} already exists`,
        },
      };
    else if (this.checkFormArrayLimit(formArray, limit))
      return {
        isValid: false,
        message: {
          severity: 'error',
          summary: 'Invalid input',
          detail: `You can only add up to ${limit} specifications`,
        },
      };
    else if (this.checkIsFormGroupEmpty(formGroup) || !formGroup.valid)
      return {
        isValid: false,
        message: {
          severity: 'error',
          summary: 'Invalid input',
          detail: `You must enter a valid value in both fields to add a new specification`,
        },
      };
    else return { isValid: true, message: undefined };
  }

  checkIsFormGroupEmpty(formGroup: FormGroup): boolean {
    const keyControl = formGroup.get('key') as FormControl;
    const valueControl = formGroup.get('value') as FormControl;
    return !keyControl.value || !valueControl.value;
  }

  checkFormArrayLimit(formArray: FormArray<any>, limit: number): boolean {
    return formArray.controls.length > limit;
  }

  checkIsFirstElementInFormArray(
    specificationsFormArray: FormArray<any>
  ): boolean {
    return specificationsFormArray.controls.length === 0;
  }

  addRecord<T>(
    recordControl: FormControl | null,
    newRecord: Record<string, T> | null
  ) {
    recordControl?.setValue({
      ...recordControl.value,
      ...newRecord,
    });
  }

  // toggleFormControl<T>(
  //   form: FormGroup,
  //   formControl: FormControl,
  //   condition: boolean,
  //   defaultValue?: T,
  //   valueWhileDisabled?: T
  // ) {
  //   if (condition) {
  //     formControl.enable();
  //     formControl.setValue(defaultValue);
  //     formControl.setValidators(Validators.required);
  //   } else {
  //     formControl.disable();
  //     if(valueWhileDisabled) formControl.setValue(valueWhileDisabled);
  //     formControl.clearValidators();
  //   }
  //   formControl.updateValueAndValidity();
  //   form.updateValueAndValidity();
  // }

  toggleFormControl(
    form: FormGroup,
    formControl: FormControl,
    condition: boolean,
  ) {
    if (condition) {
      formControl.enable();
      // formControl.setValue(defaultValue);
      formControl.setValidators(Validators.required);
    } else {
      formControl.disable();
      // if(valueWhileDisabled) formControl.setValue(valueWhileDisabled);
      formControl.clearValidators();
    }
    formControl.updateValueAndValidity();
    form.updateValueAndValidity();
  }

  convertFormArrayToRecord<T>(
    formArray: FormArray,
    initialRecord: Record<string, T> | null = null
  ): Record<string, T> | null {
    let record: Record<string, T> | null = initialRecord;
    const array = formArray.controls.map((control) => control.value);
    // console.log(array);
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
    // console.log(record);
    return record;
  }

  convertFormGroupToRecord<T>(formGroup: FormGroup): Record<string, T> | null {
    if (!formGroup.valid) {
      return null;
    }
    const formGroupValues = formGroup.value;
    return { [formGroupValues.key]: formGroupValues.value };
  }

  getLastGroupFromFormArray(formArray: FormArray) {
    return formArray.at(formArray.length - 1) as FormGroup;
  }
}
