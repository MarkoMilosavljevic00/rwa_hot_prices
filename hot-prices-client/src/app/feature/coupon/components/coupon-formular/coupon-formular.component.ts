import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import {
  FileSelectEvent,
  FileUpload,
  FileUploadEvent,
} from 'primeng/fileupload';
import {
  IMAGES_URL,
  LIMITS,
  TIME,
  UPLOAD_IMAGES_URL,
  YES_NO_OPTIONS,
} from 'src/app/common/constants';
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { Option } from 'src/app/common/interfaces/option.interface';
import { CategoryService } from 'src/app/feature/post/services/category.service';
import { DiscountCalculatorService } from 'src/app/shared/services/discount-calculator.service';
import { FormControlService } from 'src/app/shared/services/form-control.service';
import { Coupon } from '../../models/coupon.model';
import { ActivatedRoute } from '@angular/router';
import { CouponDto } from '../../models/coupon.dto';
import { ImageType } from 'src/app/common/enums/image-type.enum';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectCategoriesList } from 'src/app/feature/post/state/category/category.selector';
import { selectIdFromRouteParams } from 'src/app/state/app.selectors';
import { isNotUndefined } from 'src/app/common/type-guards';
import { Subscription, filter, skip, switchMap } from 'rxjs';
import { UploadedImage } from 'src/app/common/interfaces/uploaded-image.interface';
import { FileService } from 'src/app/shared/services/file.service';
import {
  createCoupon,
  loadEditingCoupon,
  loadEditingCouponFailure,
  updateCoupon,
} from '../../state/coupon.action';
import { selectEditingCoupon } from '../../state/coupon.selector';
import { loadCategories } from 'src/app/feature/post/state/category/category.action';
import { updateConversation } from 'src/app/feature/conversation/state/conversation.action';
import { FormCouponDto } from '../../models/dtos/form-coupon.dto';
import { PostType } from 'src/app/common/enums/post-type.enum';

@Component({
  selector: 'app-coupon-formular',
  templateUrl: './coupon-formular.component.html',
  styleUrls: ['./coupon-formular.component.css'],
})
export class CouponFormularComponent implements OnInit {
  couponSubscription: Subscription;

  coupon?: Coupon;
  couponForm: FormGroup;
  editMode: boolean;

  description: string;
  minExpiryDate: Date;

  // uploadedFiles: File[];
  categoryOptions: TreeNode[];
  saleTypeOptions: SaleType[];
  multipleDiscountOptions: Option[];
  expiryDateOptions: Option[];
  codeOptions: Option[];

  SaleType = SaleType;
  readonly UPLOAD_IMAGES_URL = UPLOAD_IMAGES_URL + ImageType.POST_IMAGE;

  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService,
    private formControlService: FormControlService,
    private fileService: FileService,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  get discountsFormArray(): FormArray {
    return this.couponForm.get('discountsFormArray') as FormArray;
  }

  get addedDiscountsControl() {
    return this.couponForm.get('addedDiscounts');
  }

  get lastDiscount() {
    return this.discountsFormArray.at(
      this.discountsFormArray.length - 1
    ) as FormGroup;
  }

  get multipleDiscountsControl() {
    return this.couponForm.get('multipleDiscountOptionSelected');
  }

  get maxDiscountControl() {
    return this.couponForm.get('maxDiscount');
  }

  get uploadedImagesControl() {
    return this.couponForm.get('uploadedImages');
  }

  get saleTypeControl() {
    return this.couponForm.get('saleType');
  }

  get codeControl() {
    return this.couponForm.get('code');
  }

  get linkControl() {
    return this.couponForm.get('link');
  }

  get expiryDateOptionSelectedControl() {
    return this.couponForm.get('expiryDateOptionSelected');
  }

  get expiryDateControl() {
    return this.couponForm.get('expiryDate');
  }

  get descriptionControl() {
    return this.couponForm.get('description');
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.initValues();
    this.loadCoupon();
  }

  private initFormGroup() {
    this.couponForm = new FormGroup({
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl(),
      selectedCategory: new FormControl('', {
        validators: [Validators.required],
      }),
      uploadedImages: new FormControl([]),
      store: new FormControl(),
      saleType: new FormControl(SaleType.Offline),
      link: new FormControl({ value: '', disabled: true }),
      codeOptionSelected: new FormControl(false, { nonNullable: false }),
      code: new FormControl({ value: '', disabled: true }),
      location: new FormControl(),
      multipleDiscountOptionSelected: new FormControl(false, {
        nonNullable: false,
      }),
      discountsFormArray: new FormArray([]),
      addedDiscounts: new FormControl({}),
      maxDiscount: new FormControl(0),
      expiryDateOptionSelected: new FormControl(false, { nonNullable: false }),
      expiryDate: new FormControl({ value: null, disabled: true }),
    });
  }

  private initValues() {
    this.editMode = false;
    this.minExpiryDate = new Date(Date.now());
    this.store.dispatch(loadCategories());
    this.store.select(selectCategoriesList).subscribe((categories) => {
      this.categoryOptions = categories.map((category) =>
        this.categoryService.convertCategoryToTreeNode(category)
      );
    });
    this.saleTypeOptions = Object.values(SaleType);
    this.codeOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
    this.multipleDiscountOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
    this.expiryDateOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
  }

  loadCoupon() {
    this.couponSubscription = this.store
      .select(selectIdFromRouteParams)
      .pipe(
        filter(isNotUndefined),
        switchMap((couponId) => {
          this.store.dispatch(loadEditingCoupon({ id: +couponId }));
          return this.store.select(selectEditingCoupon);
        }),
        skip(1)
      )
      .subscribe((coupon) => {
        if (coupon) {
          // if (coupon.kind !== PostType.COUPON) {
          //   this.store.dispatch(
          //     loadEditingCouponFailure({
          //       error: { error: { message: 'Wrong path' } },
          //     })
          //   );
          // }
          this.editMode = true;
          this.coupon = { ...coupon };
          console.log(this.coupon);
          this.patchFormWithLoadedCoupon(coupon);
          // this.patchSelectedOptions(coupon);
          this.patchDiscounts(coupon.discounts);
        }
      });
  }

  patchFormWithLoadedCoupon(coupon: Coupon) {
    this.couponForm.patchValue({
      title: coupon.title,
      selectedCategory: coupon.category
        ? this.categoryService.convertCategoryToTreeNode(coupon.category)
        : null,
      description: coupon.description,
      uploadedImages: coupon.imgPaths
        ? coupon.imgPaths.map((imgPath) => ({
            name: imgPath,
            size: 0,
            serverFilename: imgPath,
          }))
        : [],
      saleType: coupon.saleType,
      link: coupon.link,
      store: coupon.store,
      location: coupon.location,
      multipleDiscountOptionSelected:
        coupon.discounts && Object.keys(coupon.discounts).length > 0
          ? true
          : false,
      maxDiscount: coupon.maxDiscount,
      codeOptionSelected: coupon.code ? true : false,
      code: coupon.code,
      expiryDateOptionSelected: coupon.expiryDate ? true : false,
      expiryDate: coupon.expiryDate ? new Date(coupon.expiryDate) : null,
    });

    this.formControlService.toggleFormControl(
      this.couponForm,
      this.linkControl as FormControl,
      coupon.saleType === SaleType.Online
    );

    this.formControlService.toggleFormControl(
      this.couponForm,
      this.codeControl as FormControl,
      coupon.code ? true : false
    );

    this.formControlService.toggleFormControl(
      this.couponForm,
      this.expiryDateControl as FormControl,
      coupon.expiryDate ? true : false
    );
  }

  // patchSelectedOptions(coupon: Coupon) {
  //   this.onSaleTypeOptionChange(coupon.saleType);
  //   this.onCodeOptionChange(coupon.code ? true : false);
  //   this.onExpiryDateOptionChange(coupon.expiryDate ? true : false);
  // }

  patchDiscounts(discounts?: Record<string, number>) {
    // if (discounts) {
    //   this.multipleDiscountsControl?.setValue(true);
    //   for (const key in discounts) {
    //     if (discounts.hasOwnProperty(key)) {
    //       this.onAddDiscount(key, discounts[key]);
    //     }
    //   }
    // }
    if (!discounts || Object.keys(discounts).length === 0) {
      this.multipleDiscountsControl?.setValue(false);
      return;
    }
    this.multipleDiscountsControl?.setValue(true);
    for (const key in discounts) {
      this.formControlService.addFormGroupToFormArray(
        this.discountsFormArray,
        key,
        discounts[key]
      );
      this.formControlService.addRecordFromFormGroup(
        this.lastDiscount,
        this.addedDiscountsControl! as FormControl
      );
    }
    this.formControlService.addFormGroupToFormArray(this.discountsFormArray);
  }

  getImagePath(serverFilename: string) {
    return `${IMAGES_URL}/${ImageType.POST_IMAGE}/${serverFilename}`;
  }

  onUploadImages(event: any) {
    // for (let file of event.files) {
    //   this.uploadedFiles.push(file);
    // }
    // this.messageService.add({
    //   severity: 'info',
    //   summary: 'File Uploaded',
    //   detail: '',
    // });
    const serverResponse = event.originalEvent.body;
    const uploadedImages = this.uploadedImagesControl?.value;
    event.files.forEach((file: File, index: number) => {
      uploadedImages.push({
        name: file.name,
        size: file.size,
        serverFilename: serverResponse[index],
      });
    });
    this.uploadedImagesControl?.setValue(uploadedImages);
    this.messageService.add({
      severity: 'success',
      summary: serverResponse.length + ' file(s) uploaded successfully',
      detail: '',
    });
  }

  onSelectImages(event: FileSelectEvent, fileUpload: FileUpload) {
    if (
      event.currentFiles.length + this.uploadedImagesControl?.value.length >
      LIMITS.COUPON.IMAGES
    ) {
      fileUpload.clear();
      this.messageService.add({
        severity: 'error',
        summary: 'Upload Error',
        detail: `You can only upload up to ${LIMITS.COUPON.IMAGES} files.`,
      });
    }
  }

  onDeleteImage(file: UploadedImage) {
    this.fileService.deleteImage('coupons', file.serverFilename).subscribe(
      (response) => {
        let uploadedImagesArray = this.uploadedImagesControl?.value;
        uploadedImagesArray = uploadedImagesArray.filter(
          (uploadedFile: UploadedImage) => uploadedFile.name !== file.name
        );
        this.uploadedImagesControl?.setValue(uploadedImagesArray);
        this.messageService.add(response);
      },
      (error) => {
        this.messageService.add(error);
      }
    );
  }

  checkDiscountsLimit() {
    return this.formControlService.checkFormArrayLimit(
      this.discountsFormArray,
      LIMITS.OFFER.SPECIFICATIONS
    );
  }

  checkIsFirstDiscount() {
    return this.formControlService.checkIsFirstElementInFormArray(
      this.discountsFormArray
    );
  }

  checkIsDiscountsEmpty() {
    if (this.checkIsFirstDiscount()) {
      return false;
    }
    return this.formControlService.checkIsFormGroupEmpty(this.lastDiscount);
  }

  checkDiscountsValidity() {
    return this.formControlService.checkKeyValueFormGroupValidity(
      this.discountsFormArray,
      this.lastDiscount,
      this.addedDiscountsControl?.value,
      LIMITS.OFFER.SPECIFICATIONS
    );
  }

  onLastDiscountChanged(): void {
    this.formControlService.toggleValidatorToKeyValueFormGroup(
      this.lastDiscount,
      [Validators.required]
    );
  }

  onAddDiscount(key?: string, value?: string) {
    if (
      this.formControlService.checkIsFirstElementInFormArray(
        this.discountsFormArray
      )
    ) {
      this.formControlService.addFormGroupToFormArray(
        this.discountsFormArray,
        key,
        value
      );
    } else {
      let { isValid, message } = this.checkDiscountsValidity();
      if (isValid) {
        this.formControlService.addRecordFromFormGroup(
          this.lastDiscount,
          this.addedDiscountsControl! as FormControl
        );
        this.formControlService.addFormGroupToFormArray(
          this.discountsFormArray,
          key,
          value
        );
      } else {
        this.messageService.add(message!);
        return;
      }
    }
  }

  onDeleteDiscount(index: number) {
    const keyToRemove = this.discountsFormArray.at(index).get('key')?.value;
    this.discountsFormArray.removeAt(index);
    if (!keyToRemove) return;
    const currentDiscounts = this.addedDiscountsControl?.value || {};
    delete currentDiscounts[keyToRemove];
    this.addedDiscountsControl?.setValue(currentDiscounts);
  }

  getDiscount() {
    if (
      this.multipleDiscountsControl?.value &&
      this.addedDiscountsControl?.value &&
      Object.keys(this.addedDiscountsControl?.value).length > 0
    ) {
      const discountsRecord: Record<string, number> =
        this.addedDiscountsControl?.value;
      const discount = Math.max(...Object.values(discountsRecord));
      return { discount, discountsRecord };
    } else
      return {
        discount: this.maxDiscountControl?.value,
        discountsRecord: null,
      };
    // let discount: number;
    // let discountsRecord: Record<string, number> | null;
    // if (this.multipleDiscountsControl?.value) {
    //   discountsRecord =
    //     this.formControlService.convertFormArrayToRecord<number>(
    //       this.discountsFormArray,
    //       null
    //     ) || {};
    //   discount = Math.max(...Object.values(discountsRecord));
    // } else {
    //   discount = this.addedDiscountsControl?.value;
    //   discountsRecord = null;
    // }
    // return { discount, discountsRecord };
  }

  onExpiryDateOptionChange(isExpiryDateActivated: boolean) {
    this.formControlService.toggleFormControl(
      this.couponForm,
      this.expiryDateControl as FormControl,
      isExpiryDateActivated
      // this.expiryDateControl?.value
      //   ? this.expiryDateControl?.value
      //   : new Date(Date.now() + TIME.MILISECONDS.ONE_DAY),
      // this.expiryDateControl?.value
    );
  }

  onCodeOptionChange(codeExists: boolean) {
    this.formControlService.toggleFormControl(
      this.couponForm,
      this.codeControl as FormControl,
      codeExists
    );
  }

  onSaleTypeOptionChange(saleType: SaleType) {
    this.formControlService.toggleFormControl(
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
      const newDate = new Date(new Date(Date.now() + TIME.MILISECONDS.ONE_DAY));
      this.expiryDateControl?.setValue(newDate);
    }
  }

  onSubmit() {
    let { discount, discountsRecord } = this.getDiscount();

    // const formCouponDto: FormCouponDto = {
    //   title: this.couponForm.value.title,
    //   category: this.categoryService.convertTreeNodeToCategory(
    //     this.couponForm.value.selectedCategory
    //   ),
    //   description: this.couponForm.value.description,
    //   saleType: this.couponForm.value.saleType,
    //   store: this.couponForm.value.store,
    //   link: this.couponForm.value.link,
    //   code: this.couponForm.value.code,
    //   location: this.couponForm.value.location,
    //   discount: discount,
    //   discounts: discountsRecord ?? undefined,
    //   expiryDate: this.couponForm.value.expiryDate,
    // };
    const formCouponDto: FormCouponDto = {
      postType: PostType.COUPON,
      imgPaths: this.uploadedImagesControl?.value.map(
        (uploadedImage: UploadedImage) => uploadedImage.serverFilename
      ),
      title: this.couponForm.value.title,
      categoryId: this.couponForm.value.selectedCategory.data.id,
      description: this.couponForm.value.description,
      saleType: this.couponForm.value.saleType,
      link: this.couponForm.value.link,
      store: this.couponForm.value.store,
      location: this.couponForm.value.location,
      maxDiscount: discount,
      discounts: discountsRecord ?? {},
      code: this.couponForm.value.code,
      expiryDate: this.couponForm.value.expiryDate,
    };

    console.log(formCouponDto);

    if (this.editMode) {
      this.store.dispatch(updateCoupon({ id: this.coupon!.id, formCouponDto }));
    } else {
      this.store.dispatch(createCoupon({ formCouponDto }));
    }
  }

  ngOnDestroy(): void {
    this.couponSubscription.unsubscribe();
  }
}
