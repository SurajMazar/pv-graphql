import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './model/auth.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation((returns) => Auth)
  async login(@Args('username') username: string) {
    const a = await this.auth.login(username);
    console.log(a);
    return a;
  }
}
