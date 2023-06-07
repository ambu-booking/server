import { PrismaClient, Company } from "@prisma/client";

const prisma = new PrismaClient();

class CompanyService {
  async getCompanies(): Promise<Company[]> {
    return prisma.company.findMany();
  }

  async createCompany(name: string): Promise<Company> {
    return prisma.company.create({ data: { name } });
  }

  async updateCompany(id: string, name: string): Promise<Company> {
    return prisma.company.update({
      where: { id },
      data: { name },
    });
  }

  async deleteCompany(id: string): Promise<Company> {
    return prisma.company.delete({ where: { id } });
  }
}

export default CompanyService;
