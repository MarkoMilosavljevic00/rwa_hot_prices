import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/feature/post/services/category.service';
import { TreeNode } from 'primeng/api';
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
import { DiscountCalculatorService } from 'src/app/shared/services/discount-calculator.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Option } from 'src/app/common/interfaces/option.interface';
import { IMAGES_URL, LIMITS, TIME, YES_NO_OPTIONS } from 'src/app/common/constants';
import { FormControlService } from 'src/app/shared/services/form-control.service';
import {
  FileSelectEvent,
  FileUpload,
  FileUploadEvent,
  UploadEvent,
} from 'primeng/fileupload';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Offer } from '../../models/offer.model';
import { OFFERS } from '../../services/offer.model';
import { HttpClient } from '@angular/common/http';
import { OfferDto } from '../../models/dtos/offer.dto';
import { FormOfferDto } from '../../models/dtos/create-offer.dto';
import { OfferService } from '../../services/offer.service';
import {
  OperatorFunction,
  catchError,
  filter,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileService } from 'src/app/shared/services/file.service';
import { UploadedImage } from 'src/app/common/interfaces/uploaded-image.interface';
import { Validity } from 'src/app/common/interfaces/validity.interface';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { loadEditingOffer, resetEditingOffer } from '../../state/offer.action';
import { selectEditingOffer } from '../../state/offer.selector';

@Component({
  selector: 'app-offer-formular',
  templateUrl: './offer-formular.component.html',
  styleUrls: ['./offer-formular.component.css'],
})
export class OfferFormularComponent implements OnInit {
  offer?: Offer;

  offerForm: FormGroup;
  editMode: boolean;

  description: string;
  minExpiryDate: Date;

  categoryOptions: TreeNode[];
  saleTypeOptions: SaleType[];
  discountOptions: Option[];
  expiryDateOptions: Option[];

  readonly SaleType = SaleType;

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
    private offerService: OfferService,
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
    this.initInnerElementsValues();
    this.loadOfferToForm();
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
      uploadedImages: new FormControl([], {
        // validators: [Validators.required],
      }),
      saleType: new FormControl(SaleType.Offline),
      store: new FormControl(''),
      link: new FormControl({ value: '', disabled: true }),
      location: new FormControl(''),
      specificationsFormArray: new FormArray([]),
      addedSpecifications: new FormControl({}),
      price: new FormControl(0, {
        validators: [Validators.required, Validators.min(1)],
      }),
      discountOptionSelected: new FormControl(false, { nonNullable: false }),
      oldPrice: new FormControl({ value: null, disabled: true }),
      discount: new FormControl({ value: null, disabled: true }),
      expiryDateOptionSelected: new FormControl(false, { nonNullable: false }),
      expiryDate: new FormControl({ value: null, disabled: true }),
    });
  }

  private initInnerElementsValues() {
    this.editMode = false;
    this.categoryService.getAll().subscribe((categories) => {
      this.categoryOptions = categories.map((category) =>
        this.categoryService.convertCategoryToTreeNode(category)
      );
    });
    this.saleTypeOptions = Object.values(SaleType);
    this.discountOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
    this.expiryDateOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
    this.minExpiryDate = new Date();
  }

  private loadOfferToForm() {
    const offerId = this.route.snapshot.paramMap.get('id');
    if (!offerId)
      this.store.dispatch((resetEditingOffer()));
    else { 
      this.store.dispatch(loadEditingOffer({ offerId: +offerId })); 
    }
    this.store.select(selectEditingOffer).subscribe((offer) => {
      if (offer) {
        this.editMode = true;
        this.offer = offer;
        this.patchValuesInForm(offer);
        this.patchSelectedOptions();
        this.patchSpecifications(offer.specifications);
      }
    });
  }

  private patchSelectedOptions() {
    this.onSaleTypeOptionChange(this.saleTypeControl?.value);
    this.onDiscountOptionChange(this.discountOptionSelectedControl?.value);
    this.onExpiryDateOptionChange(
      this.expiryDateOptionSelectedControl?.value
    );
  }

  private patchValuesInForm(offer: Offer) {
    this.offerForm.patchValue({
      title: offer.title,
      selectedCategory: offer.category
        ? this.categoryService.convertCategoryToTreeNode(
          this.offer!.category
        )
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
      expiryDate: offer.expiryDate
        ? new Date(offer.expiryDate)
        : null,
    });
  }

  getImagePath(serverFilename: string) {
    return IMAGES_URL + '/offers/' + serverFilename;
  }

  patchSpecifications(specifications?: Record<string, string>) {
    for (const key in specifications) {
      if (specifications.hasOwnProperty(key)) {
        this.onAddSpecification(key, specifications[key]);
      }
    }
    this.onAddSpecification();
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

    // console.log(offer);
    // console.log(offer.expiryDate);
    // console.log(offer.specifications);

    if (this.editMode) {
      this.offerService
        .update(this.offer!.id, offer)
        .subscribe((responseOffer) => {
          console.log(responseOffer);
        });
    } else {
      this.offerService.post(offer).subscribe((responseOffer) => {
        console.log(responseOffer);
      });
    }
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
    this.formControlService.toggleFormControl<number>(
      this.offerForm,
      this.oldPriceControl as FormControl,
      isDiscountActivated,
      this.oldPriceControl?.value
        ? this.oldPriceControl?.value
        : this.priceControl?.value,
      this.oldPriceControl?.value
    );
    this.formControlService.toggleFormControl<number>(
      this.offerForm,
      this.discountControl as FormControl,
      isDiscountActivated,
      this.discountControl?.value ? this.discountControl?.value : 0,
      this.discountControl?.value
    );
  }

  onExpiryDateOptionChange(isExpiryDateActivated: boolean) {
    this.formControlService.toggleFormControl<Date>(
      this.offerForm,
      this.expiryDateControl as FormControl,
      isExpiryDateActivated,
      this.expiryDateControl?.value
        ? this.expiryDateControl?.value
        : new Date(Date.now() + TIME.MILISECONDS.ONE_DAY),
      this.expiryDateControl?.value
    );
  }

  onSaleTypeOptionChange(saleType: SaleType) {
    this.formControlService.toggleFormControl<SaleType>(
      this.offerForm,
      this.linkControl as FormControl,
      saleType === SaleType.Online,
      this.linkControl?.value ? this.linkControl?.value : '',
      this.linkControl?.value
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
      const newDate = new Date(new Date(Date.now() + TIME.MILISECONDS.ONE_DAY));
      // newDate.setDate(currentDate.getDate() + 7);
      this.expiryDateControl?.setValue(newDate);
    }
  }
}
