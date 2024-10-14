import { Body, Controller, Delete, FileTypeValidator, Inject, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IMAGE_SERVICE } from './config/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { FileUploadDto } from 'apps/common/dto/image.dto';
import { firstValueFrom } from 'rxjs';
import { thumbnailGeneration } from './utils/thumbnailGeneration';
import { CreateImageDto } from './dto/create-image.dto';
import { AuthGuard } from './auth/auth.guard';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiParam } from '@nestjs/swagger';
import { ImageDtoResponse } from './dto/image.dto';


@Controller('image')
export class AppController {
  constructor(@Inject(IMAGE_SERVICE) private readonly imageClient: ClientProxy) { }

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: [CreateImageDto], })
  @ApiCreatedResponse({
    description: 'File uploaded successfully.',
    type: Array<string>,
  })
  async uploadImage(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024, // 5MB
          }),
          new FileTypeValidator({
            fileType: /^image\/(jpeg|png|gif|bmp|webp|tiff|jpg)$/i,
          }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
    @Body() createImageDto: CreateImageDto

  ) {
    const { height, width } = createImageDto
    let { format } = createImageDto
    const filesToUpload: Array<FileUploadDto> = await Promise.all(files.map(async file => {
      let buffer
      if (!format || !width || !height) {
        format = 'jpeg'
        buffer = await thumbnailGeneration(file.buffer)
      }
      else
        buffer = await thumbnailGeneration(file.buffer, width, height, format)
      const originalName = file.originalname.split('.').slice(0, -1).join('').concat(`.${format}`)
      return {
        buffer: Buffer.from(buffer).toString('base64'),
        originalName,
        mimeType: file.mimetype
      } satisfies FileUploadDto
    }))
    try {
      const urls = await firstValueFrom(this.imageClient.send('upload-images', filesToUpload))
      return urls
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':name')
  @ApiParam({ name: 'name', type: String })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ImageDtoResponse,
  })
  async deleteImage(@Param('name') name: string) {
    try {
      const result = await firstValueFrom(this.imageClient.send('delete-image', name))
      return result
    } catch (error) {
      throw new RpcException(error)
    }
  }



}

