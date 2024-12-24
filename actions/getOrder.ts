import prisma from "@/libs/prismadb";

interface GetOrderByIdParams {
  orderId?: string;
}

export async function getOrderById({ orderId }: GetOrderByIdParams) {
  try {
    const orders = await prisma.order.findUnique({ where: { id: orderId } });
    return orders;
  } catch (err: any) {
    throw new Error(err);
  }
}
