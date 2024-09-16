import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { JwtAuthService } from '../shared/jwt/jwt.service';
import * as E from 'fp-ts/Either';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
} from '../shared/constants/status.codes';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtAuthService,
    private readonly prisma: PrismaService,
  ) {}

  async login(email: string, password: string) {
    try {
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
    } catch (exception) {
      return E.left({
        message: 'Internal Server error',
        code: INTERNAL_SERVER_ERROR,
      });
    }
  }
}
