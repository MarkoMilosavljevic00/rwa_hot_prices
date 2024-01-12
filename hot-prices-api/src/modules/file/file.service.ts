import { Injectable, NotFoundException } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as multer from 'multer';
import { ImageType } from 'src/models/enums/image-type.enum';
import { File } from 'multer';
import { existsSync, unlinkSync } from 'fs';
import { response } from 'express';

@Injectable()
export class FileService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          let dest = 'images/' + req.params.imageType;
          // const imageType = req.body.imageType;
          // dest += imageType;
          // if (imageType === ImageType.UserImage) {
          //   dest += 'users';
          // } else if (imageType === 'offers') {
          //   dest += 'offers';
          // } else if (imageType === 'coupons') {
          //   dest += 'coupons';
          // }
          cb(null, dest);
        },
        filename: (req, file, cb) => {
          const extension: string = path.parse(file.originalname).ext;
          const uniqueName: string = uuidv4();
          cb(null, `${uniqueName}${extension}`);
        },
      }),
    };
  }

  getFilenamesFromUploadedFiles(files: File[]): string[] {
    return files.map((file) => file.filename);
  }

  getImagePath(imageType: ImageType, imageName: string) {
    // const imagePath = join(__dirname, '..' , '..', '..' ,'..', 'images', imageType, imageName);
    const imagePath = path.resolve(
      process.cwd(),
      'images',
      imageType,
      imageName,
    );
    return imagePath;
  }

  deleteImage(imageType: ImageType, imageName: string) {
    const imagePath = this.getImagePath(imageType, imageName);
    if (!existsSync(imagePath)) {
      throw new NotFoundException(`Image ${imageName} not found`);
    }
    unlinkSync(imagePath);
    return true;
  }
}
