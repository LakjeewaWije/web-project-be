import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';

@Module({
  providers: [AuthsService],
  controllers: [AuthsController]
})
export class AuthsModule {}
