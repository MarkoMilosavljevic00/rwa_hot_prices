import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  readonly UPLOAD_IMAGES_URL = environment.api + '/file/uploadImages/offers';
  readonly GET_IMAGE_URL = environment.api + '/file/getImage/offers/';

  constructor(private readonly http: HttpClient) { }

  deleteImage(imageType: string, imageName: string) {
    return this.http.delete(`${environment.api}/file/deleteImage/${imageType}/${imageName}`);
  }
}
