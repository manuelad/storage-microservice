import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    @Index({ unique: true })
    userName: string

    @Column()
    password: string

}