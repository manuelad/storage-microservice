import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import 'dotenv/config';
import { Image } from './entities/image.entity';

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
            entities: [Image],
        }),
        TypeOrmModule.forFeature([Image]),
    ],
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule { }
