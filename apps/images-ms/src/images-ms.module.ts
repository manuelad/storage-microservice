import { Module } from '@nestjs/common';
import { ImagesMsController } from './images-ms.controller';
import { ImagesMsService } from './images-ms.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ImagesMsController],
  providers: [ImagesMsService],
})
export class ImagesMsModule { }
