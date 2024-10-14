import { User } from "apps/users/src/database/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filePath: string

    @Column()
    fileName: string

    @Column()
    fileSize: number

    @Column()
    createdAt: Date

    @Column()
    url: string

    @ManyToOne(() => User, (user) => user.images)
    user: User


}