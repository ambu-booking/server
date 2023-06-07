import { PrismaClient, Company } from "@prisma/client";

const prisma = new PrismaClient();

class CompanyService {
  async getCompanies(): Promise<Company[]> {
    return prisma.company.findMany();
  }

  async createCompany(name: string): Promise<Company> {
    const companyName = name.trim();
    if (!companyName) {
      throw new Error("Company's name can't be empty");
    }
    return prisma.company.create({ data: { name: companyName } });
  }

  async updateCompany(id: string, name: string): Promise<Company> {
    await prisma.company.findFirstOrThrow({ where: { id } });
    return prisma.company.update({
      where: { id },
      data: { name },
    });
  }

  async deleteCompany(id: string): Promise<Company> {
    await prisma.company.findFirstOrThrow({ where: { id } });
    return prisma.company.delete({ where: { id } });
  }
}

export default CompanyService;
