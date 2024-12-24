import { getOrderById } from "@/actions/getOrder";
import { Container } from "@/app/components/Container";
import { OrderDetails } from "./OrderDetails";

interface IParams {
  orderId?: string;
}

export default async function Order({ params }: { params: IParams }) {
  const orderId = params.orderId;
  const order = await getOrderById({ orderId });

  if (!order) return;
  return (
    <div className=" p-8 ">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
}
