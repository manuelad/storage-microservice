import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { User } from 'apps/users/src/database/entities/user.entity';

export class DatabaseService {
    constructor(
        @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async createImage(fileName: string, filePath: string, fileSize: number, createdAt: string, url: string, userId: string) {
        try {
            const image = this.imageRepository.create({
                fileName,
                filePath,
                fileSize,
                createdAt,
                url
            })
            const userRef = await this.userRepository.findOneBy({ id: userId })
            image.user = userRef
            return this.imageRepository.save(image);
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async getImageByName(name: string) {
        try {
            const image = await this.imageRepository.findOne({ where: { fileName: name } })
            return image
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async deleleImageById(id: number) {
        try {
            const image = await this.imageRepository.delete({ id })
            return image
        } catch (error) {
            throw new RpcException(error)
        }
    }
}
