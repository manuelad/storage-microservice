import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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


}