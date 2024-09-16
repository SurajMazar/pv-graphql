import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PrismaModule } from '../core/prisma/prisma.module';
import { JwtAuthModule } from '../core/jwt/jwt.module';

@Module({
  imports: [JwtAuthModule, PrismaModule],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
