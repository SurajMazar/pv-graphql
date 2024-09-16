import { UserService } from './user.service';
import { Query, Resolver } from '@nestjs/graphql';
import { User } from './model/user.model';
import { Logger, UseGuards } from '@nestjs/common';
import { handleFailureResponse } from '../core/utils/response.util';
import * as E from 'fp-ts/Either';
import { BAD_REQUEST } from '../core/constants/status.codes';
import { JwtAuthGuard } from '../core/guard/jwt-auth-guard/jwt-auth.guard';

@Resolver(() => User)
export class UserResolver {
  /**
   * LOGGER
   * @private
   */
  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async users() {
    const users = await this.userService.index();
    if (E.isLeft(users)) {
      return handleFailureResponse(
        'Failed to get user list',
        BAD_REQUEST,

        users?.left,
      );
    }
    return users?.right?.users;
  }
}
