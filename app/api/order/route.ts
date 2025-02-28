import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || (currentUser && currentUser.role !== "ADM")) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { id, deliveryStatus } = body;

  const order = await prisma.order.update({
    where: {
      id,
    },
    data: {
      deliveryStatus,
    },
  });

  return NextResponse.json(order);
}
