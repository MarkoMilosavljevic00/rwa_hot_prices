import { Component, Input } from '@angular/core';
import { Offer } from '../../models/offer.model';
import { DEFAULT, IMAGES_URL } from 'src/app/common/constants';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css'],
})
export class OfferItemComponent {
  @Input() offer: Offer;

  constructor(private fileService: FileService) {}

  setFirstImage() {
    if (this.offer && this.offer.imgPaths?.length > 0) {
      return IMAGES_URL + '/offers/' + this.offer.imgPaths[0];
    } else {
      return DEFAULT.POST.IMAGE;
    }
  }

  formatDate(date: Date): Date {
    return new Date(date);
  }
}
