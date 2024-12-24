import prisma from "@/libs/prismadb";

interface GetUsersParams {
  orderId?: string;
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err: any) {
    throw new Error(err);
  }
}
