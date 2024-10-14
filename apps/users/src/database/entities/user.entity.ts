import { Image } from "apps/images-ms/src/database/entities/image.entity";
import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    @Index({ unique: true })
    userName: string

    @Column()
    password: string

    @OneToMany(() => Image, image => image.user)
    images: Image[]

}