import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { YES_NO_OPTIONS } from 'src/app/common/constants';
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { Option } from 'src/app/common/interfaces/option.interface';
import { CategoryService } from 'src/app/feature/post/services/category.service';
import { DiscountCalculatorService } from 'src/app/shared/services/discount-calculator.service';
import { FormControlService } from 'src/app/shared/services/form-control.service';

@Component({
  selector: 'app-coupon-formular',
  templateUrl: './coupon-formular.component.html',
  styleUrls: ['./coupon-formular.component.css'],
})
export class CouponFormularComponent implements OnInit {
  SaleType = SaleType;

  description: string;
  couponForm: FormGroup;
  uploadedFiles: any[];
  categoryOptions: TreeNode[];
  discountsRecord: Record<string, string>;
  saleTypeOptions: SaleType[];
  multipleDiscountOptions: Option[];
  discount: number;
  multipleDiscounts: boolean;
  expiryDateOptions: Option[];
  minExpiryDate: Date;

  get discounts(): FormArray {
    return this.couponForm.get('discounts') as FormArray;
  }

  get discountControl() {
    return this.couponForm.get('discount');
  }

  get expiryDateControl() {
    return this.couponForm.get('expiryDate');
  }

  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService,
    private discountCalculatorService: DiscountCalculatorService,
    public formControlService: FormControlService
  ) {}

  ngOnInit(): void {
    this.couponForm = new FormGroup({
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      selectedCategory: new FormControl(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      saleType: new FormControl(SaleType.Online),
      store: new FormControl(''),
      link: new FormControl(''),
      code: new FormControl(''),
      location: new FormControl(''),
      discounts: new FormArray([]),
      multipleDiscountOptions: new FormControl(false, { nonNullable: false }),
      discount: new FormControl(0),
      expiryDateOptions: new FormControl(true, { nonNullable: false }),
      expiryDate: new FormControl(new Date()),
    });
    this.uploadedFiles = [];
    this.categoryOptions = this.categoryService.getCategoriesAsTreeNodes();
    this.saleTypeOptions = Object.values(SaleType);
    this.multipleDiscountOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
    this.expiryDateOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
    this.minExpiryDate = new Date();
  }

  onUpload(event: FileUploadEvent) {
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
    const discountsArray = this.discounts.controls.map(
      (control) => control.value
    );
    console.log(discountsArray);
    const discountsRecord: Record<string, string> = discountsArray.reduce(
      (acc: Record<string, string>, curr: { key: string; value: string }) => {
        if (curr.key && curr.value) {
          acc[curr.key] = curr.value;
        }
        return acc;
      },
      {}
    );

    console.log(discountsRecord);
    console.log(this.couponForm.value);
  }

  addDiscount() {
    if (this.discounts.valid && this.discounts.controls.length < 5) {
      const discount = new FormGroup({
        item: new FormControl(''),
        itemDiscount: new FormControl(''),
      });

      if (this.discounts.controls.length > 0) {
        this.discounts.controls[this.discounts.controls.length - 1].disable();
      }

      this.discounts.push(discount);
    }
  }

  deleteDiscount(index: number) {
    this.discounts.removeAt(index);
  }

  onMultipleDiscountOptionChange(isDiscountActivated: boolean) {
    this.multipleDiscounts = isDiscountActivated;
  }

  onExpiryDateOptionChange(isExpiryDateActivated: boolean) {
    this.formControlService.toggleFormControl<Date>(
      this.couponForm,
      'expiryDate',
      isExpiryDateActivated,
      new Date()
    );
  }

  onCodeOptionChange(codeExists: boolean) {
    this.formControlService.toggleFormControl<Date>(
      this.couponForm,
      'code',
      codeExists
    );
  }

  onSaleTypeOptionChange(saleType: SaleType) {
    this.formControlService.toggleFormControl<SaleType>(
      this.couponForm,
      'link',
      saleType === SaleType.Online
    );
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

  lastTwoFieldsEmpty() {
    // Vrati tacno ako je poslednji element u nizu prazan (prazan string) ili ako je poslednji element u nizu prazan objekat
    return (
      this.discounts.controls[this.discounts.controls.length - 1]?.value.item ===
        '' ||
      this.discounts.controls[this.discounts.controls.length - 1]?.value
        .itemDiscount === ''
    );
  }
}
