import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './model/auth.model';
import * as E from 'fp-ts/Either';
import { handleFailureResponse } from '../shared/utils/response.util';

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const login = await this.auth.login(email, password);
    if (E.isLeft(login)) {
      return handleFailureResponse(login?.left?.message, login?.left?.code);
    }
    return login?.right;
  }
}
