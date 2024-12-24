import { Container } from "@/app/components/Container";
import { ManageProductsClient } from "./ManageProductsClient";
import { getProducts } from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NullData } from "@/app/components/NullData";

export default async function ManageProducts() {
  const products = await getProducts({});
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADM") {
    return <NullData title=" Oops! Access denied!" />;
  }
  return (
    <div className="p-8">
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
}
