import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './mongodb/database.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }), 
    UsersModule, 
    AuthModule, 
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
