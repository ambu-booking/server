import { PrismaClient } from "@prisma/client";
import { Resolver, Query } from "type-graphql";
import { Company } from "../schema/Company";
const prisma = new PrismaClient();

@Resolver()
export class CompanyResolver {
  @Query(() => [Company])
  async allCompanies() {
    const companies = await prisma.company.findMany();
    return companies;
  }
}
