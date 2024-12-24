import { Container } from "@/app/components/Container";
import { ManageOrdersClient } from "./manageOrdersClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NullData } from "@/app/components/NullData";
import { getOrders } from "@/actions/getOrders";

export default async function ManageOrdens() {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADM") {
    return <NullData title=" Oops! Access denied!" />;
  }
  return (
    <div className=" pt-8">
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
}
