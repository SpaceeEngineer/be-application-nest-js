import { User } from "src/users/entities/users.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 255, unique: true})
    value: string;

    @Column({ nullable: false, length: 255, unique: true})
    description: string;

    @ManyToMany(() => User, {cascade:true})
    users: User[];
}