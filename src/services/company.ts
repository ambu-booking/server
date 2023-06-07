import { PrismaClient, Company } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateArgs {
  name: string;
  adress: string;
  city: string;
  post_code: number;
}

class CompanyService {
  async getCompanies(): Promise<Company[]> {
    return prisma.company.findMany({ include: { location: true } });
  }

  async createCompany({
    name,
    adress,
    city,
    post_code,
  }: CreateArgs): Promise<Company> {
    const companyName = name.trim();
    if (!companyName) {
      throw new Error("Company's name can't be empty");
    }
    return prisma.$transaction(async (prisma) => {
      const company = await prisma.company.create({
        data: {
          name: companyName,
        },
      });
      const location = await prisma.location.create({
        data: {
          adress,
          city,
          post_code,
          Company: {
            connect: { id: company.id },
          },
        },
      });
      return { ...company, location };
    });
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
