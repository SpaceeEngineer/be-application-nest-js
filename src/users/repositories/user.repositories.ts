import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InteractionRoles } from "src/roles/repositories/roles.repositories";
import { Repository } from "typeorm";
import { AddRoleDto } from "../dto/add-role.dto";
import { BanUserDto } from "../dto/ban-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdatePassDto } from "../dto/update-pass.dto";
import { User } from "../entities/users.entity";

@Injectable()
export class InteractionBd {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>, private rolesRepository: InteractionRoles) {}

    async createUser(dto: CreateUserDto) {
        const role = await this.rolesRepository.getRoleByValue("USER")
        const user = new User();
        user.email = dto.email;
        user.password = dto.password;
        user.roles = [role];
        await this.usersRepository.manager.save(user);
        return user;
    }

    async updateUser(user) {
        await this.usersRepository.manager.save(user);
        return user;
    }

    async deleteUsers(user) {
        await this.usersRepository.delete({password: user.password})
        return true;
    }

    async getAllUsers() {
        const users = await this.usersRepository.find({relations: {
            roles : true,
        }});
        return users
    }

    async checkExistUser(email) {
        const user = await this.usersRepository.findOne({where:{email}, relations: {roles: true}});
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.usersRepository.find({where:{id: dto.userId}, relations: {roles: true}});
        const role = await this.rolesRepository.getRoleByValue(dto.value);
        if (role && user) {
            user[0].roles = [role];
            await this.usersRepository.manager.save(user);
            return dto;
        }
        throw new HttpException('User or role not exist', HttpStatus.NOT_FOUND);
    }

    async banUser(dto: BanUserDto) {
        const user = await this.usersRepository.find({where:{id: dto.userId}});
        if (user) {
            user[0].banned = true;
            await this.usersRepository.manager.save(user);
            return user;
        }
        throw new HttpException('User or role not exist', HttpStatus.NOT_FOUND); 
    }
}