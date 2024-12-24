import { getProducts } from "@/actions/getProducts";
import { Summary } from "./Summary";
import { getOrders } from "@/actions/getOrders";
import { getUsers } from "@/actions/getUsers";
import { Container } from "../components/Container";
import { BarGraph } from "./BarGraph";
import { getGraphData } from "@/actions/getGraphData";

export default async function Admin() {
  const products = await getProducts({});
  const orders = await getOrders();
  const users = await getUsers();
  const data = await getGraphData();
  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className="mt-4 mx-auto max-w-[1150px]">
          <BarGraph data={data} />
        </div>
      </Container>
    </div>
  );
}
