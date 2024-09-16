import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '../core/prisma/prisma.module';
import { JwtAuthModule } from '../core/jwt/jwt.module';

@Module({
  imports: [PrismaModule, JwtAuthModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
