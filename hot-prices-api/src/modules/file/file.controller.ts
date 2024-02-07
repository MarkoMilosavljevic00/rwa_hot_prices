import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File } from 'multer';
import { ImageType } from 'src/common/enums/image-type.enum';
import { join } from 'path';
import { Response } from 'express';
import * as path from 'path';
import { AuthGuard } from '@nestjs/passport';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get('image/:imageType/:imageName')
  getImage(
    @Param('imageType') imageType: ImageType,
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ) {
    return this.fileService.getImage(imageType, imageName, res);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('uploadImages/:imageType')
  @UseInterceptors(
    FilesInterceptor('images[]', 10, new FileService().createMulterOptions()),
  )
  uploadImages(
    @UploadedFiles() files: File[],
    @Param('imageType') imageType: ImageType,
  ) {
    return this.fileService.getFilenamesFromUploadedFiles(files);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Delete('deleteImage/:imageType/:imageName')
  deleteImage(
    @Param('imageType') imageType: ImageType,
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ) {
    return res.send(this.fileService.deleteImage(imageType, imageName));
  }
}
