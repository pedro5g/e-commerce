import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

// delete a product
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser || (currentUser && currentUser.role !== "ADM")) {
    return NextResponse.error();
  }

  const product = await prisma.product.delete({
    where: { id: params.id },
  });

  if (!product) {
    return NextResponse.error();
  }

  return NextResponse.json(product);
}
