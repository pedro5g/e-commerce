import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

// this function crates a product
export async function POST(request: Request) {
  // get de current user
  const currentUser = await getCurrentUser();

  // check if current user exists or is in the correct role
  if (!currentUser || (currentUser && currentUser.role !== "ADM")) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { name, description, price, brand, category, inStock, images } = body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      brand,
      category,
      inStock,
      images,
      price: parseFloat(price),
    },
  });

  // check if product was create
  if (!product) {
    return NextResponse.error();
  }

  return NextResponse.json(product);
}

// updates the status of product
export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || (currentUser && currentUser.role !== "ADM")) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { id, inStock } = body;

  const product = await prisma.product.update({
    where: { id },
    data: { inStock },
  });

  if (!product) {
    return NextResponse.error();
  }

  return NextResponse.json(product);
}
