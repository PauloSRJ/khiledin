import { databaseProviders, userProviders } from './user.provider';
import { Module } from '@nestjs/common';

@Module({ 
  providers: [...userProviders, ...databaseProviders],
  exports: databaseProviders,
})
export class DatabaseModule {}
