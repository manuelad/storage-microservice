import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import 'dotenv/config';
import { Image } from './entities/image.entity';
import { User } from 'apps/users/src/database/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            // host: process.env.POSTGRES_HOST,
            // port: Number(process.env.POSTGRES_PORT),
            // username: process.env.POSTGRES_USER,
            // password: process.env.POSTGRES_PASSWORD,
            // database: process.env.POSTGRES_DATABASE,
            autoLoadEntities: true,
            synchronize: true,
            url: process.env.DATABASE_URL,
            entities: [Image, User],
        }),
        TypeOrmModule.forFeature([Image, User]),
    ],
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule { }
