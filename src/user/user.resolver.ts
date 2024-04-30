import { UserService } from './user.service';
import { Query, Resolver } from '@nestjs/graphql';
import { User } from './model/user.model';
import { Logger } from '@nestjs/common';
import { handleFailureResponse } from '../shared/utils/response.util';
import * as E from 'fp-ts/Either';
import { BAD_REQUEST } from '../shared/constants/status.codes';

@Resolver(() => User)
export class UserResolver {
  /**
   * LOGGER
   * @private
   */
  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    const users = await this.userService.index();
    if (E.isLeft(users)) {
      handleFailureResponse('Failed to get user list', BAD_REQUEST);
    }
    return E.isRight(users) ? users?.right?.users : [];
  }
}
