import { ObjectType, Field } from "type-graphql";
import { Location } from "./Location";

@ObjectType()
export class Company {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Location)
  location?: Location;
}
