import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { comment, rating, product, userId } = body;

  const deliveredOrder = currentUser.orders.some(
    (order) =>
      order.products.find((p) => p.id === product.id) &&
      order.deliveryStatus === "delivered"
  );

  const userReview = product.reviews.find((review: any) => {
    return review.userId === currentUser.id;
  });

  if (userReview || !deliveredOrder) {
    return NextResponse.error();
  }

  const review = await prisma?.review.create({
    data: {
      comment,
      reting: rating,
      productId: product.id,
      userId,
    },
  });

  return NextResponse.json(review);
}
