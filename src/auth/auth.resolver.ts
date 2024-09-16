import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './model/auth.model';
import * as E from 'fp-ts/Either';
import { handleFailureResponse } from '../core/utils/response.util';
import { LoginDto } from './dto/login.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async login(@Args('credentials') credentials: LoginDto) {
    const login = await this.auth.login(
      credentials?.email,
      credentials?.password,
    );
    if (E.isLeft(login)) {
      return handleFailureResponse(login?.left?.message, login?.left?.code);
    }
    return login?.right;
  }
}
