import prisma from "@/libs/prismadb";

interface GetProductByIdParams {
  productId?: string;
}

export async function getProductById({ productId }: GetProductByIdParams) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    return product;
  } catch (e: any) {
    throw new Error(e);
  }
}
