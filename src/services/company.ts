import { PrismaClient, Company } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateArgs {
  name: string;
  address: string;
  city: string;
  postCode: string;
}

class CompanyService {
  async getAll(
    name?: string,
    city?: string,
    postCode?: string
  ): Promise<Company[]> {
    return prisma.company.findMany({
      where: {
        name: { contains: name?.trim(), mode: "insensitive" },
        location: {
          city: { contains: city?.trim(), mode: "insensitive" },
          post_code: { contains: postCode?.trim(), mode: "insensitive" },
        },
      },
      include: { location: true },
    });
  }

  async create({
    name,
    address,
    city,
    postCode,
  }: CreateArgs): Promise<Company> {
    const companyName = name.trim();
    const companyAdress = address.trim();
    const companyCity = city.trim();
    const companyPostCode = postCode.trim();

    if (!companyName || !companyAdress || !companyCity || !companyPostCode) {
      throw new Error("All fields must be provided");
    }

    return prisma.$transaction(async (prisma) => {
      const company = await prisma.company.create({
        data: {
          name: companyName,
        },
      });
      const location = await prisma.location.create({
        data: {
          address: companyAdress,
          city: companyCity,
          post_code: companyPostCode,
          Company: {
            connect: { id: company.id },
          },
        },
      });
      return { ...company, location };
    });
  }

  async update(id: string, name: string): Promise<Company> {
    await prisma.company.findFirstOrThrow({ where: { id } });
    return prisma.company.update({
      where: { id },
      data: { name },
    });
  }

  async delete(id: string): Promise<Company> {
    const company = await prisma.company.findFirst({
      where: { id },
      include: { location: true },
    });
    if (!company) {
      throw new Error(`Company with ID ${id} not found`);
    }
    const deletedCompany = await prisma.company.delete({ where: { id } });
    if (company.location) {
      await prisma.location.delete({ where: { id: company.location.id } });
    }
    return deletedCompany;
  }
}

export default CompanyService;
