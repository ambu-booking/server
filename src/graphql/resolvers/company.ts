import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Company } from "../schema/Company";
import CompanyService from "../../services/company";

const company = new CompanyService();

@Resolver()
export class CompanyResolver {
  @Query(() => [Company])
  async companies() {
    return await company.getCompanies();
  }
  @Mutation(() => Company)
  async create(@Arg("name") name: string): Promise<Company> {
    return await company.createCompany(name);
  }
  @Mutation(() => Company)
  async update(
    @Arg("id") id: string,
    @Arg("name") name: string
  ): Promise<Company> {
    return await company.updateCompany(id, name);
  }
  @Mutation(() => Company)
  async delete(@Arg("id") id: string): Promise<Company> {
    return await company.deleteCompany(id);
  }
}
