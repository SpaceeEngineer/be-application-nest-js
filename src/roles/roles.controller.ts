import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-roles.dto';
import { InteractionRoles } from './repositories/roles.repositories';

@Controller('roles')
export class RolesController {
    constructor( private interactionRoles: InteractionRoles) {}

    @Post()
    create(@Body() roleDto: CreateRoleDto) {
        return this.interactionRoles.createRole(roleDto);
    }

    @Get('/:value')
    getByValue(@Param('value') value) {
        return this.interactionRoles.getRoleByValue(value);
    }
}
