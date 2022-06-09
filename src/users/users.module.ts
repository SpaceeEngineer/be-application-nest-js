import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { User } from './entities/users.entity';
import { InteractionBd } from './repositories/user.repositories';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    InteractionBd,
  ],
  controllers: [UsersController],
  providers: [UsersService, InteractionBd]
})
export class UsersModule {}
