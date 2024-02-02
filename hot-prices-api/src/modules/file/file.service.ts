import { Injectable, NotFoundException } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as multer from 'multer';
import { ImageType } from 'src/common/enums/image-type.enum';
import { File } from 'multer';
import { existsSync, unlinkSync } from 'fs';
import { Response, response } from 'express';

@Injectable()
export class FileService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          let dest = 'images/' + req.params.imageType;
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
    const filenames = files.map((file) => file.filename);
    return filenames;
  }

  getImageLocation(imageType: ImageType, imageName: string) {
    // const imagePath = join(__dirname, '..' , '..', '..' ,'..', 'images', imageType, imageName);
    const imagePath = path.resolve(
      process.cwd(),
      'images',
      imageType,
      imageName,
    );
    return imagePath;
  }

  getImage(imageType: ImageType, imageName: string, res: Response) {
    if (!this.isExists(imageType, imageName)) {
      throw new NotFoundException(`Image with filename " ${imageName} " not found`);
    }
    const imagePath = this.getImageLocation(imageType, imageName);
    return res.sendFile(imagePath);
  }

  isExists(imageType: ImageType, imageName: string) {
    const imagePath = this.getImageLocation(imageType, imageName);
    if (!existsSync(imagePath))
      return false
    else {
      return true;
    }
  }

  deleteImage(imageType: ImageType, imageName: string) {
    if (!this.isExists(imageType, imageName)) {
      console.log('Image not found');
      // throw new NotFoundException(`Image with filename " ${imageName} " not found`);
    } else {
      const imagePath = this.getImageLocation(imageType, imageName);
      unlinkSync(imagePath);
      console.log('Image deleted' + imageName);
      return true;
    };
  }
}
