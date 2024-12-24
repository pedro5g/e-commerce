import prisma from "@/libs/prismadb";

interface GetOrdersByUserId {
  userId: string;
}

export async function getOrderByUserId({ userId }: GetOrdersByUserId) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        user: {
          id: userId,
        },
      },
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
    });

    return orders;
  } catch (e: any) {
    throw new Error(e);
  }
}
