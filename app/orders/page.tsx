import { getCurrentUser } from "@/actions/getCurrentUser";
import { NullData } from "../components/NullData";
import { Container } from "../components/Container";
import { OrdersClient } from "./ordersClient";
import { getOrderByUserId } from "@/actions/getOrdersByUserId";

export default async function Orders() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops! Access denied" />;
  }

  const orders = await getOrderByUserId({ userId: currentUser.id });

  return (
    <div className="pt-8">
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
}
