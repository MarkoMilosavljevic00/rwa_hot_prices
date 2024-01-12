import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/feature/post/services/category.service';
import { TreeNode } from 'primeng/api';
import { SaleType } from 'src/app/common/enums/sale-type.enum';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
import { DiscountCalculatorService } from 'src/app/shared/services/discount-calculator.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Option } from 'src/app/common/interfaces/option.interface';
import { LIMITS, TIME, YES_NO_OPTIONS } from 'src/app/common/constants';
import { FormControlService } from 'src/app/shared/services/form-control.service';
import {
  FileSelectEvent,
  FileUpload,
  FileUploadEvent,
  UploadEvent,
} from 'primeng/fileupload';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../../models/offer.model';
import { OFFERS } from '../../services/offer.model';
import { HttpClient } from '@angular/common/http';
import { OfferDto } from '../../models/dtos/offer.dto';
import { OfferCreateDto } from '../../models/dtos/offer-create.dto';
import { OfferService } from '../../services/offer.service';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileService } from 'src/app/shared/services/file.service';
import { UploadedImage } from 'src/app/common/interfaces/uploaded-image.interface';
import { OfferForm } from '../../models/offer-form';

@Component({
  selector: 'app-offer-formular',
  templateUrl: './offer-formular.component.html',
  styleUrls: ['./offer-formular.component.css'],
})
export class OfferFormularComponent implements OnInit {
  offer?: Offer;
  offerForm: FormGroup;

  description: string;
  minExpiryDate: Date;

  // uploadedImages: UploadedImage[];
  categoryOptions: TreeNode[];
  saleTypeOptions: SaleType[];
  discountOptions: Option[];
  expiryDateOptions: Option[];

  readonly SaleType = SaleType;

  get specificationsFormArray(): FormArray {
    return this.offerForm.get('specifications') as FormArray;
  }

  // get uplaodedImagesFormArray(): FormArray {
  //   return this.offerForm.get('uploadedImages') as FormArray;
  // }

  get uploadedImagesControl() {
    return this.offerForm.get('uploadedImages');
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

  constructor(
    private offerService: OfferService,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private discountCalculatorService: DiscountCalculatorService,
    public fileService: FileService,
    public formControlService: FormControlService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.initInnerElementsValues();
    this.patchValues();
  }

  private initFormGroup() {
    this.offerForm = new FormGroup({
      title: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl(''),
      selectedCategory: new FormControl(),
      uploadedImages: new FormControl([], {
        validators: [Validators.required],
      }),
      saleType: new FormControl(SaleType.Offline),
      store: new FormControl(''),
      link: new FormControl({value: '', disabled: true}),
      location: new FormControl(''),
      specifications: new FormArray([]),
      price: new FormControl(0, { validators: [Validators.required, Validators.min(1)]}),
      discountOptionSelected: new FormControl(false, { nonNullable: false }),
      oldPrice: new FormControl({value: null, disabled: true}),
      discount: new FormControl({value: null, disabled: true}),
      expiryDateOptions: new FormControl(false, { nonNullable: false }),
      expiryDate: new FormControl({value: null, disabled: true}),
    });
  }

  private initInnerElementsValues() {
    // this.uploadedImages = [];
    this.categoryOptions = this.categoryService.getAllCategoriesAsTreeNodes();
    this.saleTypeOptions = Object.values(SaleType);
    this.discountOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
    this.expiryDateOptions = [YES_NO_OPTIONS.YES, YES_NO_OPTIONS.NO];
    this.minExpiryDate = new Date();
  }

  private patchValues() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.offer = OFFERS.find((offer) => offer.id.toString() === id);
        this.offerForm.patchValue({
          title: this.offer?.title,
          selectedCategory: this.categoryService.convertCategoryToTreeNode(
            this.offer!.category
          ),
          description: this.offer?.description,
          store: this.offer?.store,
          link: this.offer?.link,
          location: this.offer?.location,
          saleType: this.offer?.saleType,
          price: this.offer?.price,
          discountOptionSelected:
            (this.offer?.discount || this.offer?.oldPrice) !== undefined,
          oldPrice: this.offer?.oldPrice,
          discount: this.offer?.discount,
          expiryDateOptions: this.offer?.expiryDate !== undefined,
          expiryDate: this.offer?.expiryDate,
        });
        this.patchSpecifications(this.offer?.specifications);
      }
    });
  }

  patchSpecifications(specifications?: Record<string, string>) {
    for (const key in specifications) {
      if (specifications.hasOwnProperty(key)) {
        this.addSpecification(key, specifications[key]);
      }
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
    // event.files.forEach((file: File, index: number) => {
    //   this.uploadedImages.push({
    //     name: file.name,
    //     size: file.size,
    //     serverFilename: serverResponse[index],
    //   });
    // });
    this.messageService.add({
      severity: 'info',
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

  onDeleteImage(file: any, fileUpload: FileUpload) {
    this.fileService.deleteImage('offers', file.serverFilename).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'info',
          summary: 'File Deleted',
          detail: file.name + ' was deleted successfully',
        });
        let uploadedImagesArray = this.uploadedImagesControl?.value;
        uploadedImagesArray = uploadedImagesArray.filter(
          (uploadedFile: UploadedImage) => uploadedFile.name !== file.name
        );
        this.uploadedImagesControl?.setValue(uploadedImagesArray);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'File Delete Error',
          detail: file.name + ' was not deleted',
        });
      }
    );
  }

  onSubmit() {
    let specificationsRecord =
      this.formControlService.transformFormArrayToRecord<string>(
        this.specificationsFormArray,
        null
      );
    console.log(specificationsRecord);
    console.log(this.offerForm.value.selectedCategory.data.id);

    const offer: OfferCreateDto = {
      title: this.offerForm.value.title,
      categoryId: this.offerForm.value.selectedCategory.data.id,
      description: this.description,
      saleType: this.offerForm.value.saleType,
      store: this.offerForm.value.store,
      link: this.offerForm.value.link,
      location: this.offerForm.value.location,
      specifications: specificationsRecord!,
      price: this.offerForm.value.price,
      oldPrice: this.offerForm.value.discountOptionSelected
        ? this.offerForm.value.oldPrice
        : null,
      discount: this.offerForm.value.discountOptionSelected
        ? this.offerForm.value.discount
        : null,
      expiryDate: this.offerForm.value.expiryDateOptions
        ? this.offerForm.value.expiryDate
        : null,
      imgPaths: this.uploadedImagesControl?.value.map(
        (image: UploadedImage) => image.serverFilename
      ),
    };

    this.offerService.postOffer(offer).subscribe((responseOffer) => {
      console.log(responseOffer);
    });
  }

  addSpecification(key?: string, value?: string) {
    if (
      this.specificationsFormArray.valid &&
      this.specificationsFormArray.controls.length < 10
    ) {
      const spec = new FormGroup({
        key: new FormControl(key ?? '', Validators.required),
        value: new FormControl(value ?? '', Validators.required),
      });

      if (this.specificationsFormArray.controls.length > 0) {
        this.specificationsFormArray.controls[
          this.specificationsFormArray.controls.length - 1
        ].disable();
      }

      this.specificationsFormArray.push(spec);
    }
  }

  deleteSpecification(index: number) {
    this.specificationsFormArray.removeAt(index);
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
      new Date(Date.now() + TIME.MILISECONDS.ONE_DAY)
    );
  }

  onSaleTypeOptionChange(saleType: SaleType) {
    this.formControlService.toggleFormControl<SaleType>(
      this.offerForm,
      'link',
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
      console.log('Date is in the past');
      const newDate = new Date();
      newDate.setDate(currentDate.getDate() + 7);
      this.expiryDateControl?.setValue(newDate);
    }
  }
}
