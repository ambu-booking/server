import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Company } from "../schema/Company";
import CompanyService from "../../services/company";

const company = new CompanyService();

@Resolver()
export class CompanyResolver {
  @Query(() => [Company])
  async companies(
    @Arg("name", { nullable: true }) name?: string,
    @Arg("city", { nullable: true }) city?: string,
    @Arg("postCode", { nullable: true }) postCode?: number
  ) {
    return await company.getCompanies(name, city, postCode);
  }
  @Mutation(() => Company)
  async create(
    @Arg("name") name: string,
    @Arg("adress") adress: string,
    @Arg("city") city: string,
    @Arg("postCode") postCode: number
  ): Promise<Company> {
    return await company.createCompany({ name, adress, city, postCode });
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
