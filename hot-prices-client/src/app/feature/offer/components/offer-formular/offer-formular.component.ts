import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/feature/post/models/category';
import { CategoryService } from 'src/app/feature/post/services/category.service';
import { TreeNode } from 'primeng/api';
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
import { DiscountCalculatorService } from 'src/app/shared/services/discount-calculator.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Option } from 'src/app/common/interfaces/option.interface';
import { YES_NO_OPTIONS } from 'src/app/common/constants';
import { FormControlService } from 'src/app/shared/services/form-control.service';

@Component({
  selector: 'app-offer-formular',
  templateUrl: './offer-formular.component.html',
  styleUrls: ['./offer-formular.component.css'],
})
export class OfferFormularComponent implements OnInit {
  description: string;
  offerForm: FormGroup;
  uploadedFiles: any[];
  categoryOptions: TreeNode[];
  specificationsRecord: Record<string, string>;
  saleTypeOptions: SaleType[];
  discountOptions: Option[];
  oldPrice: number;
  discount: number;
  expiryDateOptions: Option[];
  minExpiryDate: Date;

  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService,
    private discountCalculatorService: DiscountCalculatorService,
    public formControlService: FormControlService
  ) {}

  get specifications(): FormArray {
    return this.offerForm.get('specifications') as FormArray;
  }

  get oldPriceControl() {
    return this.offerForm.get('oldPrice');
  }

  get priceControl() {
    return this.offerForm.get('price');
  }

  get discountControl() {
    return this.offerForm.get('discount');
  }

  get expiryDateControl() {
    return this.offerForm.get('expiryDate');
  }

  ngOnInit(): void {
    this.offerForm = new FormGroup({
      basicInformation: new FormGroup({
        title: new FormControl(' ', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      }),
      selectedNodes: new FormControl(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      saleType: new FormControl(''),
      store: new FormControl(''),
      link: new FormControl(''),
      location: new FormControl(''),
      specifications: new FormArray([]),
      discountOptions: new FormControl(true, { nonNullable: false }),
      price: new FormControl(0, Validators.required),
      oldPrice: new FormControl(0),
      discount: new FormControl(0),
      expiryDateOptions: new FormControl(true, { nonNullable: false }),
      expiryDate: new FormControl(new Date()),
    });
    this.uploadedFiles = [];
    this.categoryOptions = this.categoryService.getCategoriesAsTreeNodes();
    this.saleTypeOptions = Object.values(SaleType);
    this.discountOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
    this.expiryDateOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
    this.minExpiryDate = new Date();
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  onSubmit() {
    const specificationsArray = this.specifications.controls.map(
      (control) => control.value
    );
    console.log(specificationsArray);
    const specificationsRecord: Record<string, string> =
      specificationsArray.reduce(
        (acc: Record<string, string>, curr: { key: string; value: string }) => {
          if (curr.key && curr.value) {
            acc[curr.key] = curr.value;
          }
          return acc;
        },
        {}
      );

    console.log(specificationsRecord);
    console.log(this.offerForm.value);
  }

  addSpecification() {
    if (this.specifications.valid && this.specifications.controls.length < 5) {
      const spec = new FormGroup({
        key: new FormControl('', Validators.required),
        value: new FormControl('', Validators.required),
      });

      if (this.specifications.controls.length > 0)
        this.specifications.controls[
          this.specifications.controls.length - 1
        ].disable();
      this.specifications.push(spec);
    }
  }

  deleteSpecification(index: number) {
    this.specifications.removeAt(index);
  }

  onDiscountOptionChange(isDiscountActivated: boolean) {
    this.formControlService.toggleFormControl<number>(
      this.offerForm,
      'oldPrice',
      isDiscountActivated,
      this.priceControl?.value
    );
    this.formControlService.toggleFormControl<number>(
      this.offerForm,
      'discount',
      isDiscountActivated,
      0
    );
  }

  onExpiryDateOptionChange(isExpiryDateActivated: boolean) {
    this.formControlService.toggleFormControl<Date>(
      this.offerForm,
      'expiryDate',
      isExpiryDateActivated,
      new Date()
    );
  }

  onPriceChange(event: Event) {
    const price = parseFloat((event.target as HTMLInputElement).value);
    const oldPrice = parseFloat(this.oldPriceControl?.value);
    if (oldPrice < price) {
      if (oldPrice !== 0) {
        this.messageService.add({
          severity: 'info',
          summary: 'Old price can not be lower than the new price',
          detail: 'Price is set to new price',
        });
      }
      this.oldPriceControl?.setValue(price);
      this.discountControl?.setValue(0);
    } else {
      this.discountControl?.setValue(
        this.discountCalculatorService.calculateDiscount(oldPrice, price)
      );
    }
  }

  onOldPriceChange(event: Event) {
    const oldPrice = parseFloat((event.target as HTMLInputElement).value);
    const price = parseFloat(this.priceControl?.value);
    console.log(oldPrice, price);
    if (oldPrice < price) {
      this.messageService.add({
        severity: 'info',
        summary: 'Old price can not be lower than the new price',
        detail: 'Price is set to new price',
      });
      this.priceControl?.setValue(oldPrice);
      this.discountControl?.setValue(0);
    } else {
      this.discountControl?.setValue(
        this.discountCalculatorService.calculateDiscount(oldPrice, price)
      );
    }
  }

  onDiscountChange(event: Event) {
    const discount = parseFloat((event.target as HTMLInputElement).value);
    const oldPrice = parseFloat(this.oldPriceControl?.value);
    if (discount < 0 || discount > 100) {
      this.messageService.add({
        severity: 'error',
        summary: 'Discount must be between 0 and 100',
        detail: 'Discount is set to 0 and price is set to old price',
      });
      this.priceControl?.setValue(oldPrice);
      this.discountControl?.setValue(0);
    } else {
      this.priceControl?.setValue(
        this.discountCalculatorService.calculatePrice(oldPrice, discount)
      );
    }
  }

  onExpiryDateChange(event: Event) {
    const expiryDate = new Date((event.target as HTMLInputElement).value);
    const currentDate = new Date();
    if (expiryDate < currentDate) {
      console.log('Date is in the past');
      const newDate = new Date();
      newDate.setDate(currentDate.getDate() + 7);
      this.expiryDateControl?.setValue(newDate);
    }
  }
}
