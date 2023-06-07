import { ObjectType, Field } from "type-graphql";
import { Company } from "./Company";

@ObjectType()
export class Location {
  @Field(() => String)
  id: string;

  @Field(() => String)
  adress: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  post_code: number;

  @Field(() => Company, { nullable: true })
  company?: Company;
}
