import { User } from '../model/user.model';
import { UserService } from './user.service';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [User])
  async users(): Promise<Array<any>> {
    return await this.userService.getUser();
  }
}
