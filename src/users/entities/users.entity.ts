import { Roles } from "src/roles/entities/roles.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 255, unique: true})
    email: string;

    @Column({ nullable: false, length: 255})
    password: string;

    @Column({default: false})
    banned: boolean;

    @ManyToMany(() => Roles)
    @JoinTable()
    roles: Roles[];
}