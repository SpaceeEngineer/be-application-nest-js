import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoleDto } from "../dto/create-roles.dto";
import { Roles } from "../entities/roles.entity";

@Injectable()
export class InteractionRoles {

    constructor(@InjectRepository(Roles) private rolesRepository: Repository<Roles>) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.rolesRepository.save(dto);
        return role;
    }

    async getRoleByValue(value) {
        const role = await this.rolesRepository.findOne({ where: {value}});
        return role;
    }
}