import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';

@Injectable()
export class UserService {
  /**
   * LOGGER
   * @private
   */
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * USER LIST
   */
  async index() {
    try {
      const users = await this.prisma.user.findMany();
      return E.right({ users });
    } catch (exception) {
      this.logger.error(exception);
      return E.left(exception);
    }
  }

  /**
   * GET USER VIA EMAIL
   * @param email
   */
  async getUserViaEmail(email: string) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: {
          email,
        },
      });
      return O.some(user);
    } catch (exception) {
      this.logger.error(exception);
      return O.none;
    }
  }
}
