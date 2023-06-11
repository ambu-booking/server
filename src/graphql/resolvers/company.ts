import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Company } from "../schema/Company";
import CompanyService from "../../services/company";

const company = new CompanyService();

@Resolver()
export class CompanyResolver {
  @Query(() => [Company])
  async fetchCompanies(
    @Arg("name", { nullable: true }) name?: string,
    @Arg("city", { nullable: true }) city?: string,
    @Arg("postCode", { nullable: true }) postCode?: string
  ) {
    try {
      return await company.getAll(name, city, postCode);
    } catch (error) {
      console.error("An error occurred while fetching companies:", error);
      throw new Error("Failed to fetch companies");
    }
  }
  @Mutation(() => Company)
  async createCompany(
    @Arg("name") name: string,
    @Arg("address") address: string,
    @Arg("city") city: string,
    @Arg("postCode") postCode: string
  ): Promise<Company> {
    try {
      return await company.create({ name, address, city, postCode });
    } catch (error) {
      console.error("An error occurred while creating a company:", error);
      throw new Error("Failed to create a company");
    }
  }
  @Mutation(() => Company)
  async updateCompany(
    @Arg("id") id: string,
    @Arg("name") name: string
  ): Promise<Company> {
    try {
      return await company.update(id, name);
    } catch (error) {
      console.error("An error occurred while updating a company:", error);
      throw new Error("Failed to update a company");
    }
  }
  @Mutation(() => Company)
  async deleteCompany(@Arg("id") id: string): Promise<Company> {
    try {
      return await company.delete(id);
    } catch (error) {
      console.error("An error occurred while deteling a company:", error);
      throw new Error("Failed to delete a company");
    }
  }
}
