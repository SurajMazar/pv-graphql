import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../model/user.model';

@ObjectType({ description: 'auth ' })
export class Auth {
  @Field()
  token: string;

  @Field()
  user: User;
}
