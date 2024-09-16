import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { JwtAuthService } from '../core/jwt/jwt.service';
import * as E from 'fp-ts/Either';
import { INVALID_CREDENTIALS } from '../core/constants/status.codes';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtAuthService,
    private readonly prisma: PrismaService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return E.left({
        message: 'Invalid Credentials',
        code: INVALID_CREDENTIALS,
      });
    }

    const token = await this.jwt.generateToken(user);
    return E.right({
      user,
      token,
    });
  }
}
