import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { InteractionBd } from './repositories/user.repositories';

@Controller('users')
export class UsersController {

    constructor( private interactionBd: InteractionBd) {}
    
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.interactionBd.getAllUsers();
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() roleDto: AddRoleDto) {
        return this.interactionBd.addRole(roleDto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    banUser(@Body() banDto: BanUserDto) {
        return this.interactionBd.banUser(banDto);
    }
}

