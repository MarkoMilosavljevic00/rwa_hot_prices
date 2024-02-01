import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/feature/post/services/category.service';
import { TreeNode } from 'primeng/api';
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { DiscountCalculatorService } from 'src/app/shared/services/discount-calculator.service';
import { Option } from 'src/app/common/interfaces/option.interface';
import {
  DEFAULT,
  IMAGES_URL,
  LIMITS,
  NOT_FOUND,
  TIME,
  UPLOAD_IMAGES_URL,
  YES_NO_OPTIONS,
} from 'src/app/common/constants';
import { FormControlService } from 'src/app/shared/services/form-control.service';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Offer } from '../../models/offer.model';
import { FormOfferDto } from '../../models/dtos/form-offer.dto';
import { Subscription, filter, skip, switchMap } from 'rxjs';
import { FileService } from 'src/app/shared/services/file.service';
import { UploadedImage } from 'src/app/common/interfaces/uploaded-image.interface';
import { Validity } from 'src/app/common/interfaces/validity.interface';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import {
  loadEditingOffer,
  clearEditingOffer,
  createOffer,
  updateOffer,
} from '../../state/offer.action';
import { selectEditingOffer } from '../../state/offer.selector';
import { Category } from 'src/app/feature/post/models/category.model';
import { selectCategoriesList } from 'src/app/feature/post/state/category/category.selector';
import { loadCategories } from 'src/app/feature/post/state/category/category.action';
import { selectIdFromRouteParams } from 'src/app/state/app.selectors';
import { isNotUndefined } from 'src/app/common/type-guards';
import { ImageType } from 'src/app/common/enums/image-type.enum';

@Component({
  selector: 'app-offer-formular',
  templateUrl: './offer-formular.component.html',
  styleUrls: ['./offer-formular.component.css'],
})
export class OfferFormularComponent implements OnInit, OnDestroy {
  offerSubscription: Subscription;

  editMode: boolean = false;

  offer?: Offer;
  offerForm: FormGroup;

  minExpiryDate: Date;

  categoryOptions: TreeNode<Category>[];
  saleTypeOptions: SaleType[];
  discountOptions: Option[];
  expiryDateOptions: Option[];

  readonly SaleType = SaleType;
  readonly UPLOAD_IMAGES_URL = UPLOAD_IMAGES_URL + ImageType.POST_IMAGE;

  get specificationsFormArray(): FormArray {
    return this.offerForm.get('specificationsFormArray') as FormArray;
  }

  get addedSpecificationsControl() {
    return this.offerForm.get('addedSpecifications');
  }

  get lastSpecification() {
    return this.specificationsFormArray.at(
      this.specificationsFormArray.length - 1
    ) as FormGroup;
  }

  get uploadedImagesControl() {
    return this.offerForm.get('uploadedImages');
  }

  get saleTypeControl() {
    return this.offerForm.get('saleType');
  }

  get priceControl() {
    return this.offerForm.get('price');
  }

  get discountOptionSelectedControl() {
    return this.offerForm.get('discountOptionSelected');
  }

  get oldPriceControl() {
    return this.offerForm.get('oldPrice');
  }

  get discountControl() {
    return this.offerForm.get('discount');
  }

  get linkControl() {
    return this.offerForm.get('link');
  }

  get expiryDateControl() {
    return this.offerForm.get('expiryDate');
  }

  get expiryDateOptionSelectedControl() {
    return this.offerForm.get('expiryDateOptionSelected');
  }

  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService,
    private discountCalculatorService: DiscountCalculatorService,
    public fileService: FileService,
    public formControlService: FormControlService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.initValues();
    this.loadOffer();
  }

  ngOnDestroy(): void {
    this.offerSubscription.unsubscribe();
    this.store.dispatch(clearEditingOffer());
  }

  private initFormGroup() {
    this.offerForm = new FormGroup({
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl(''),
      selectedCategory: new FormControl('', {
        validators: [Validators.required],
      }),
      uploadedImages: new FormControl([], {}),
      saleType: new FormControl(SaleType.Offline),
      store: new FormControl(''),
      link: new FormControl({ value: '', disabled: true }),
      location: new FormControl(''),
      specificationsFormArray: new FormArray([]),
      addedSpecifications: new FormControl({}),
      price: new FormControl(0, {
        validators: [
          Validators.required,
          Validators.min(LIMITS.OFFER.MIN_PRICE),
          Validators.max(LIMITS.OFFER.MAX_PRICE),
        ],
      }),
      discountOptionSelected: new FormControl(false, { nonNullable: false }),
      oldPrice: new FormControl({ value: null, disabled: true }),
      discount: new FormControl({ value: null, disabled: true }),
      expiryDateOptionSelected: new FormControl(false, { nonNullable: false }),
      expiryDate: new FormControl({ value: null, disabled: true }),
    });
  }

  initValues() {
    this.editMode = false;
    this.minExpiryDate = new Date(Date.now());
    this.store.dispatch(loadCategories());
    this.store.select(selectCategoriesList).subscribe((categories) => {
      this.categoryOptions = categories.map((category) =>
        this.categoryService.convertCategoryToTreeNode(category)
      );
    });
    this.saleTypeOptions = Object.values(SaleType);
    this.discountOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
    this.expiryDateOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
  }

  loadOffer() {
    this.offerSubscription = this.store
      .select(selectIdFromRouteParams)
      .pipe(
        filter(isNotUndefined),
        switchMap((offerId) => {
          this.store.dispatch(loadEditingOffer({ id: +offerId }));
          return this.store.select(selectEditingOffer);
        })
      )
      .pipe(filter(isNotUndefined))
      .subscribe((offer) => {
        this.editMode = true;
        this.offer = {...offer};
        this.patchFormWithLoadedOffer(offer);
        this.patchSelectedOptions();
        this.patchSpecifications(offer.specifications);
      });
  }

  patchFormWithLoadedOffer(offer: Offer) {
    this.offerForm.patchValue({
      title: offer.title,
      selectedCategory: offer.category
        ? this.categoryService.convertCategoryToTreeNode(offer.category)
        : null,
      description: offer.description,
      uploadedImages: offer.imgPaths
        ? offer.imgPaths.map((imgPath) => ({
            name: imgPath,
            size: 0,
            serverFilename: imgPath,
          }))
        : [],
      saleType: offer.saleType,
      link: offer.link,
      store: offer.store,
      location: offer.location,
      price: offer.price,
      discountOptionSelected: (offer.discount || offer.oldPrice) !== undefined,
      oldPrice: offer.oldPrice,
      discount: offer.discount,
      expiryDateOptionSelected: offer.expiryDate !== undefined,
      expiryDate: offer.expiryDate ? new Date(offer.expiryDate) : null,
    });
  }

  patchSelectedOptions() {
    this.onSaleTypeOptionChange(this.saleTypeControl?.value);
    this.onDiscountOptionChange(this.discountOptionSelectedControl?.value);
    this.onExpiryDateOptionChange(this.expiryDateOptionSelectedControl?.value);
  }

  patchSpecifications(specifications?: Record<string, string>) {
    if (!specifications || Object.keys(specifications).length === 0) {
      return;
    }
    for (const key in specifications) {
      this.formControlService.addFormGroupToFormArray(
        this.specificationsFormArray,
        key,
        specifications[key]
      );
      this.formControlService.addRecordFromFormGroup(
        this.lastSpecification,
        this.addedSpecificationsControl! as FormControl
      );
    }
    this.formControlService.addFormGroupToFormArray(
      this.specificationsFormArray
    );
  }

  getImagePath(serverFilename: string) {
    return `${IMAGES_URL}/${ImageType.POST_IMAGE}/${serverFilename}`;
  }

  onSubmit() {
    const offer: FormOfferDto = {
      title: this.offerForm.value.title,
      categoryId: this.offerForm.value.selectedCategory.data.id,
      description: this.offerForm.value.description,
      saleType: this.offerForm.value.saleType,
      link:
        this.offerForm.value.saleType === SaleType.Online
          ? this.offerForm.value.link
          : null,
      store: this.offerForm.value.store,
      location: this.offerForm.value.location,
      specifications: this.offerForm.value.addedSpecifications,
      price: this.offerForm.value.price,
      oldPrice: this.offerForm.value.discountOptionSelected
        ? this.offerForm.value.oldPrice
        : null,
      discount: this.offerForm.value.discountOptionSelected
        ? this.offerForm.value.discount
        : null,
      expiryDate:
        this.offerForm.value.expiryDateOptionSelected &&
        this.offerForm.value.expiryDate
          ? new Date(this.offerForm.value.expiryDate)
          : null,
      imgPaths: this.uploadedImagesControl?.value.map(
        (image: UploadedImage) => image.serverFilename
      ),
    };

    console.log('Submitting Offer... ', offer);

    if (this.editMode) {
      this.store.dispatch(
        updateOffer({ id: this.offer!.id, formOfferDto: offer })
      );
    } else {
      this.store.dispatch(createOffer({ formOfferDto: offer }));
    }
  }

  onUploadImages(event: any) {
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
      LIMITS.OFFER.IMAGES
    ) {
      fileUpload.clear();
      this.messageService.add({
        severity: 'error',
        summary: 'Upload Error',
        detail: `You can only upload up to ${LIMITS.OFFER.IMAGES} files.`,
      });
    }
  }

  onDeleteImage(file: UploadedImage) {
    this.fileService.deleteImage('offers', file.serverFilename).subscribe(
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

  checkSpecificationsLimit(): boolean {
    return this.formControlService.checkFormArrayLimit(
      this.specificationsFormArray,
      LIMITS.OFFER.SPECIFICATIONS
    );
  }

  checkIsFirstSpecification(): boolean {
    return this.formControlService.checkIsFirstElementInFormArray(
      this.specificationsFormArray
    );
  }

  checkIsSpecificationsEmpty(): boolean {
    if (this.checkIsFirstSpecification()) {
      return false;
    }
    return this.formControlService.checkIsFormGroupEmpty(
      this.lastSpecification
    );
  }

  checkSpecificationsValidity(): Validity {
    return this.formControlService.checkKeyValueFormGroupValidity(
      this.specificationsFormArray,
      this.lastSpecification,
      this.addedSpecificationsControl?.value,
      LIMITS.OFFER.SPECIFICATIONS
    );
  }

  onLastSpecificationChanged(): void {
    this.formControlService.toggleValidatorToKeyValueFormGroup(
      this.lastSpecification,
      [Validators.required]
    );
  }

  onAddSpecification(key?: string, value?: string) {
    if (
      this.formControlService.checkIsFirstElementInFormArray(
        this.specificationsFormArray
      )
    ) {
      this.formControlService.addFormGroupToFormArray(
        this.specificationsFormArray,
        key,
        value
      );
    } else {
      let { isValid, message } = this.checkSpecificationsValidity();
      if (isValid) {
        this.formControlService.addRecordFromFormGroup(
          this.lastSpecification,
          this.addedSpecificationsControl! as FormControl
        );

        this.formControlService.addFormGroupToFormArray(
          this.specificationsFormArray,
          key,
          value
        );
      } else {
        this.messageService.add(message!);
        return;
      }
    }
  }

  onDeleteSpecification(index: number) {
    this.specificationsFormArray.removeAt(index);
    this.addedSpecificationsControl?.setValue(
      this.formControlService.convertFormArrayToRecord<string>(
        this.specificationsFormArray,
        null
      )
    );
  }

  onDiscountOptionChange(isDiscountActivated: boolean) {
    this.formControlService.toggleFormControl(
      this.offerForm,
      this.oldPriceControl as FormControl,
      isDiscountActivated
    );
    this.formControlService.toggleFormControl(
      this.offerForm,
      this.discountControl as FormControl,
      isDiscountActivated
    );
  }

  onExpiryDateOptionChange(isExpiryDateActivated: boolean) {
    this.formControlService.toggleFormControl(
      this.offerForm,
      this.expiryDateControl as FormControl,
      isExpiryDateActivated
    );
  }

  onSaleTypeOptionChange(saleType: SaleType) {
    this.formControlService.toggleFormControl(
      this.offerForm,
      this.linkControl as FormControl,
      saleType === SaleType.Online
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
      const newDate = new Date(new Date(Date.now() + TIME.MILISECONDS.ONE_DAY));
      this.expiryDateControl?.setValue(newDate);
    }
  }
}
