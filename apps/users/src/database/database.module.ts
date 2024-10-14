import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DatabaseService } from './database.service';
import 'dotenv/config';
import { Image } from 'apps/images-ms/src/database/entities/image.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            // host: process.env.POSTGRES_HOST,
            // port: Number(process.env.POSTGRES_PORT),
            // username: process.env.POSTGRES_USER,
            // password: process.env.POSTGRES_PASSWORD,
            // database: process.env.POSTGRES_DATABASE,
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true,
            entities: [User, Image],
        }),
        TypeOrmModule.forFeature([User, Image]),
    ],
    providers: [DatabaseService],
    exports: [DatabaseService]

})
export class DatabaseModule { }
