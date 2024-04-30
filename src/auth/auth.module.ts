import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PrismaModule } from '../shared/prisma/prisma.module';
import { JwtAuthModule } from '../shared/jwt/jwt.module';

@Module({
  imports: [JwtAuthModule, PrismaModule],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
