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
import { Coupon } from '../../models/coupon.model';
import { ActivatedRoute } from '@angular/router';
import { COUPONS } from '../../services/coupons';
import { CouponDto } from '../../models/coupon.dto';

@Component({
  selector: 'app-coupon-formular',
  templateUrl: './coupon-formular.component.html',
  styleUrls: ['./coupon-formular.component.css'],
})
export class CouponFormularComponent implements OnInit {
  coupon?: Coupon;
  couponForm: FormGroup;

  description: string;
  minExpiryDate: Date;

  uploadedFiles: File[];
  categoryOptions: TreeNode[];
  saleTypeOptions: SaleType[];
  multipleDiscountOptions: Option[];
  expiryDateOptions: Option[];
  codeOptions: Option[];

  SaleType = SaleType;

  get discountsFormArray(): FormArray {
    return this.couponForm.get('discounts') as FormArray;
  }

  get discountControl() {
    return this.couponForm.get('discount');
  }

  get multipleDiscountsControl() {
    return this.couponForm.get('multipleDiscountOptionSelected');
  }

  get expiryDateControl() {
    return this.couponForm.get('expiryDate');
  }

  get descriptionControl(){
    return this.couponForm.get('description');
  }

  get linkControl(){
    return this.couponForm.get('link');
  }

  get codeControl(){
    return this.couponForm.get('code');
  }

  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService,
    public formControlService: FormControlService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.initInnerElementsValues();
    this.patchValues();
  }

  private initFormGroup() {
    this.couponForm = new FormGroup({
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl(),
      selectedCategory: new FormControl(),
      saleType: new FormControl(SaleType.Online),
      store: new FormControl(''),
      link: new FormControl(''),
      codeOptionSelected: new FormControl(true, { nonNullable: false }),
      code: new FormControl(''),
      location: new FormControl(''),
      multipleDiscountOptionSelected: new FormControl(false, {
        nonNullable: false,
      }),
      discounts: new FormArray([]),
      discount: new FormControl(0),
      expiryDateOptions: new FormControl(true, { nonNullable: false }),
      expiryDate: new FormControl(new Date()),
    });
  }

  private initInnerElementsValues() {
    this.uploadedFiles = [];
    this.categoryOptions = this.categoryService.getAllCategoriesAsTreeNodes();
    this.saleTypeOptions = Object.values(SaleType);
    this.codeOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
    this.multipleDiscountOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
    this.expiryDateOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
    this.minExpiryDate = new Date();
  }

  patchValues() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.coupon = COUPONS.find((coupon) => coupon.id.toString() === id);
        this.couponForm.patchValue({
          title: this.coupon?.title,
          selectedCategory: this.categoryService.convertCategoryToTreeNode(
            this.coupon!.category
          ),
          description: this.coupon?.description,
          store: this.coupon?.store,
          link: this.coupon?.link,
          code: this.coupon?.code,
          location: this.coupon?.location,
          saleType: this.coupon?.saleType,
          multipleDiscountOptionSelected: this.coupon?.discounts !== undefined,
          // discount: this.coupon?.discount,
          expiryDateOptions: this.coupon?.expiryDate !== undefined,
          expiryDate: this.coupon?.expiryDate,
        });
        this.patchDiscounts(this.coupon?.discounts);
      }
    });
  }

  patchDiscounts(discounts?: Record<string, number>) {
    if (discounts) {
      this.multipleDiscountsControl?.setValue(true);
      for (const key in discounts) {
        if (discounts.hasOwnProperty(key)) {
          this.addDiscount(key, discounts[key]);
        }
      }
    }
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
    let { discount, discountsRecord } = this.getDiscount();

    const coupon: CouponDto = {
      title: this.couponForm.value.title,
      category: this.categoryService.convertTreeNodeToCategory(
        this.couponForm.value.selectedCategory
      ),
      description: this.couponForm.value.description,
      saleType: this.couponForm.value.saleType,
      store: this.couponForm.value.store,
      link: this.couponForm.value.link,
      code: this.couponForm.value.code,
      location: this.couponForm.value.location,
      discount: discount,
      discounts: discountsRecord ?? undefined,
      expiryDate: this.couponForm.value.expiryDate,
    };

    console.log(coupon);
  }

  private getDiscount() {
    let discount: number;
    let discountsRecord: Record<string, number> | null;
    if (this.multipleDiscountsControl?.value) {
      discountsRecord =
        this.formControlService.convertFormArrayToRecord<number>(
          this.discountsFormArray,
          null
        ) || {};
      discount = Math.max(...Object.values(discountsRecord));
    } else {
      discount = this.discountControl?.value;
      discountsRecord = null;
    }
    return { discount, discountsRecord };
  }

  addDiscount(item?: string, itemDiscount?: number) {
    if (
      this.discountsFormArray.valid &&
      this.discountsFormArray.controls.length < 10
    ) {
      const discount = new FormGroup({
        key: new FormControl(item ?? ''),
        value: new FormControl(itemDiscount ?? ''),
      });

      if (this.discountsFormArray.controls.length > 0) {
        this.discountsFormArray.controls[
          this.discountsFormArray.controls.length - 1
        ].disable();
      }
      this.discountsFormArray.push(discount);
    }
  }

  deleteDiscount(index: number) {
    this.discountsFormArray.removeAt(index);
  }

  onExpiryDateOptionChange(isExpiryDateActivated: boolean) {
    this.formControlService.toggleFormControl<Date>(
      this.couponForm,
      this.expiryDateControl as FormControl,
      isExpiryDateActivated,
      new Date()
    );
  }

  onCodeOptionChange(codeExists: boolean) {
    this.formControlService.toggleFormControl<boolean>(
      this.couponForm,
      this.codeControl as FormControl,
      codeExists,
      false
    );
  }

  onSaleTypeOptionChange(saleType: SaleType) {
    this.formControlService.toggleFormControl<SaleType>(
      this.couponForm,
      this.linkControl as FormControl,
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

  isLastTwoFieldsEmpty() {
    return (
      this.discountsFormArray.controls[
        this.discountsFormArray.controls.length - 1
      ]?.value.key === '' ||
      this.discountsFormArray.controls[
        this.discountsFormArray.controls.length - 1
      ]?.value.value === ''
    );
  }
}
