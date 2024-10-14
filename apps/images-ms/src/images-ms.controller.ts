import { Controller, Scope } from '@nestjs/common';
import { ImagesMsService } from './images-ms.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FileUploadDto } from 'apps/common/dto/image.dto';

@Controller({ scope: Scope.REQUEST })
export class ImagesMsController {
  constructor(private readonly imagesMsService: ImagesMsService) { }

  @MessagePattern('upload-images')
  async uploadImages(@Payload() files: { filesToUpload: Array<FileUploadDto>, userId: any }) {
    try {
      const result = await this.imagesMsService.uploadImages(files.filesToUpload, files.userId);
      return result
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern('delete-image')
  async deleteImage(@Payload() name: string) {
    try {
      const result = await this.imagesMsService.deleteImage(name);
      return result
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
