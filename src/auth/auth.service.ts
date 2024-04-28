import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtAuthService,
    private readonly prisma: PrismaService,
  ) {}

  async login(username: string): Promise<any> {
    console.log(username);
    const user = await this.prisma.user.findFirst();
    const token = await this.jwt.generateToken(user);
    console.log({ user, token });
    return {
      user,
      token,
    };
  }
}
