import { Component, Input } from '@angular/core';
import { Offer } from '../../models/offer.model';
import { DEFAULT } from 'src/app/common/constants';
import { FileService } from 'src/app/shared/services/file.service';


@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css']
})
export class OfferItemComponent {
  @Input() offer!: Offer;

  constructor(private fileService: FileService) {

  }

  setFirstImage(){
    if(this.offer && this.offer.imgPaths?.length > 0){
      return this.fileService.GET_IMAGE_URL + this.offer.imgPaths[0];
    }else{
      return DEFAULT.OFFER.IMAGE;
    }
  }
}
