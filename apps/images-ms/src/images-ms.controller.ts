import { Controller } from '@nestjs/common';
import { ImagesMsService } from './images-ms.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileUploadDto } from 'apps/common/dto/image.dto';

@Controller()
export class ImagesMsController {
  constructor(private readonly imagesMsService: ImagesMsService) { }

  @MessagePattern('upload-images')
  uploadImages(@Payload() files: Array<FileUploadDto>) {
    return this.imagesMsService.uploadImages(files);
  }

  @MessagePattern('delete-image')
  deleteImage(@Payload() name: string) {
    return this.imagesMsService.deleteImage(name);
  }
}
