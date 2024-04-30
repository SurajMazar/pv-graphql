import { Field, ObjectType } from '@nestjs/graphql';
import { User } from "../../user/model/user.model";

@ObjectType({ description: 'auth ' })
export class Auth {
  @Field()
  token: string;

  @Field()
  user: User;
}
