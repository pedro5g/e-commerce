import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}
export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        orders: true,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;

    // return {
    //   ...currentUser,
    //   createdAt: currentUser.createdAt.toISOString(),
    //   updateAt: currentUser.updateAt.toISOString(),
    //   emailVerified: currentUser.emailVerified?.toISOString() || null,
    // };
  } catch (err) {}
}
