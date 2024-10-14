import { Injectable, OnModuleInit } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { deleteObject, FirebaseStorage, getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';
import { v4 } from 'uuid';
import { firebaseConfig } from './config/config';
import { RpcException } from '@nestjs/microservices';
import { FileUploadDto } from 'apps/common/dto/image.dto';
import { DatabaseService } from './database/database.service';

@Injectable()
export class ImagesMsService implements OnModuleInit {

  constructor(private readonly databaseService: DatabaseService) { }

  private storage: FirebaseStorage
  onModuleInit() {
    const app = initializeApp(firebaseConfig);
    this.storage = getStorage(app)
  }

  async uploadImages(files: Array<FileUploadDto>) {
    try {

      const resultFilesUpload = await Promise.all(files.map(async (file) => {
        const ext = file.originalName.split('.').pop();
        const mimeType = file.mimeType.split('/')[0].concat(`/${ext}`)
        const metadata = {
          contentType: mimeType,
        };
        const storageRef = ref(this.storage, `${process.env.FOLDER_STORAGE}/${v4()}.${ext}`)
        const result = await uploadString(storageRef, file.buffer, 'base64', metadata)
        console.log(result)
        const url = await getDownloadURL(storageRef)
        const { fullPath: filePath, name: fileName, size: fileSize, timeCreated: createdAt } = result.metadata
        await this.databaseService.createImage(fileName, filePath, fileSize, createdAt, url)
        return url

      }))
      return resultFilesUpload


    } catch (error) {
      throw new RpcException(error)
    }

  }

  async deleteImage(name: string) {
    try {
      const image = await this.databaseService.getImageByName(name)
      const storageRef = ref(this.storage, image.filePath)
      await deleteObject(storageRef)
      await this.databaseService.deleleImageById(image.id)
      return image
    } catch (error) {
      throw new RpcException(error)
    }
  }
}


