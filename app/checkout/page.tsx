import { Container } from "../components/Container";
import { FormWrap } from "../components/FormWrap";
import { CheckoutClient } from "./CheckoutClient";

export default function Checkout() {
  return (
    <>
      <Container>
        <FormWrap>
          <CheckoutClient />
        </FormWrap>
      </Container>
    </>
  );
}
