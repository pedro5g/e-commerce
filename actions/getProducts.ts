import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string;
  searchTerm?: string | null;
}

export async function getProducts({ category, searchTerm }: IProductParams) {
  try {
    let searchString = searchTerm ? searchTerm : "";
    console.log("category", category);
    const products = await prisma.product.findMany({
      where: {
        category,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
              },
            },
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
