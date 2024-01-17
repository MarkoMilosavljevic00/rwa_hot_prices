import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  readonly UPLOAD_IMAGES_URL = environment.api + '/file/uploadImages/offers';
  readonly GET_IMAGE_URL = environment.api + '/file/getImage/offers/';

  constructor(private readonly http: HttpClient) {}

  deleteImage(imageType: string, imageName: string) {
    return this.http
      .delete(`${environment.api}/file/deleteImage/${imageType}/${imageName}`)
      .pipe(
        map((response) => {
          return {
            severity: 'success',
            summary: 'File Deleted',
            detail: imageName + ' was deleted successfully',
          };
        }),
        catchError((error) => {
          if(error.status === 404)
            return of({
              severity: 'info',
              summary: 'File Not Found On Server',
              detail: imageName + ' was not found on the server. It may have already been deleted.',
            });
          else
            throw {
              severity: 'error',
              summary: 'Unknown Error',
              detail: imageName + ' was not deleted',
            };
        })
      );
  }
}
