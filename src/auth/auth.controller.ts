import { Body, Controller, Delete, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdatePassDto } from 'src/users/dto/update-pass.dto';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    
    @UsePipes(ValidationPipe)
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto): Promise<{ token: string; }> {
        return this.authService.registration(userDto)
    }

    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Put('/changepass')
    changePass(@Body() userDto: UpdatePassDto) {
        return this.authService.changePass(userDto);
    }

    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Delete('/delete')
    deleteUser(@Body() userDto: UpdatePassDto) {
        return this.authService.deleteUser(userDto);
    }
}
