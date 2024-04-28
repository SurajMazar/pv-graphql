import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user ' })
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  displayName?: string;

  @Field()
  email: string;
}
