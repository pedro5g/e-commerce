import { Container } from "@/app/components/Container";
import { FormWrap } from "@/app/components/FormWrap";
import { AddProductForm } from "./AddProdoctForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NullData } from "@/app/components/NullData";

export default async function AddProducts() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADM") {
    return <NullData title="Oops! Your access is denied" />;
  }
  return (
    <>
      <div className=" p-8">
        <Container>
          <FormWrap>
            <AddProductForm />
          </FormWrap>
        </Container>
      </div>
    </>
  );
}
