import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { InteractionRoles } from './repositories/roles.repositories';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports:[TypeOrmModule.forFeature([Roles])],
  exports: [
    InteractionRoles,
  ],
  controllers: [RolesController],
  providers: [RolesService, InteractionRoles]
})
export class RolesModule {}
