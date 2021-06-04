import { userProviders } from './../mongodb/user.provider';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/mongodb/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController], 
  providers: [UsersService, ...userProviders],
})
export class UsersModule {}
