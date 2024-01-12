import { SaleType } from "src/app/common/enums/sale-type.enum";
import { UploadedImage } from "src/app/common/interfaces/uploaded-image.interface";

export interface OfferForm {
  title: string;
  description: string;
  selectedCategory: string;
  uploadedImages: UploadedImage[];
  saleType: SaleType;
  store: string;
  link: string;
  location: string;
  specifications: any[];
  price: number;
  discountOptionSelected: boolean;
  oldPrice: number;
  discount: number;
  expiryDateOptions: boolean;
}