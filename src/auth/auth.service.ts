import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { InteractionBd } from 'src/users/repositories/user.repositories';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/users.entity';
import { UpdatePassDto } from 'src/users/dto/update-pass.dto';
import { isUndefined } from 'util';

@Injectable()
export class AuthService {

    constructor(private interactionBd:InteractionBd, 
                private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        if (user.banned) {
            throw new HttpException(`User with email: ${userDto.email} is banned`, HttpStatus.BAD_REQUEST)
        } 
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const getUser = await this.interactionBd.checkExistUser(userDto.email);
        if (getUser) {
            throw new HttpException(`User with email: ${userDto.email} exist`, HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.interactionBd.createUser({...userDto, password: hashPassword})
        return this.generateToken(user);
    }

    async changePass(userDto: UpdatePassDto) {
        const getUser = await this.interactionBd.checkExistUser(userDto.email);
        
        if (!getUser ) {
            throw new HttpException(`User with email: ${userDto.email} no exist`, HttpStatus.BAD_REQUEST);
        }
        
        getUser.password = await bcrypt.hash(userDto.password, 5);
        const user = await this.interactionBd.updateUser(getUser);
        return this.generateToken(user);
    }

    async deleteUser(userDto: UpdatePassDto) {
        const user = await this.validateUser(userDto);
        if (user) {
            
            if (await this.interactionBd.deleteUsers(user)) {
                return ({message: "User delete"});
            }
        }
        throw new HttpException(`User is not exist`, HttpStatus.BAD_REQUEST);
        
    }

    async generateToken(user: User) {
        const token =  {email: user.email, id: user.id, roles: user.roles};
        return {
            token: this.jwtService.sign(token)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.interactionBd.checkExistUser(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        } else {
            throw new UnauthorizedException({message:'Inccorect email or password'});
        }
    }


}
