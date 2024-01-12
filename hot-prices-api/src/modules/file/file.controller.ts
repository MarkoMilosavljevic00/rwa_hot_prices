import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File } from 'multer';
import { ImageType } from 'src/models/enums/image-type.enum';
import { join } from 'path';
import { Response } from 'express';
import * as path from 'path';

@Controller('file')
export class FileController {

  constructor(
    private fileService: FileService,
  ) {}
  
  @Get('getImage/:imageType/:imageName')
  getImage(@Param('imageType') imageType: ImageType, @Param('imageName') imageName: string, @Res() res: Response) {
    return res.sendFile(this.fileService.getImagePath(imageType, imageName));
  }
  
  @Post('uploadImages/:imageType')
  @UseInterceptors(FilesInterceptor('images[]', 10, new FileService().createMulterOptions()))
  uploadImages(@UploadedFiles() files: File[], @Param('imageType') imageType: ImageType) {
    return this.fileService.getFilenamesFromUploadedFiles(files);
  }

  @Delete('deleteImage/:imageType/:imageName')
  deleteImage(@Param('imageType') imageType: ImageType, @Param('imageName') imageName: string, @Res() res: Response) {
    return res.send(this.fileService.deleteImage(imageType, imageName));
  }
}