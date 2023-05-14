import { Resolver, Query } from "type-graphql";
import { Company } from "../schema/Company";
import prisma from "../../../lib/prisma";

@Resolver()
export class CompanyResolver {
  @Query(() => [Company])
  async allCompanies() {
    const companies = await prisma.company.findMany();
    return companies;
  }
}
