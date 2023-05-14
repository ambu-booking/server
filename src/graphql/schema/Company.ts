import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Company {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}
