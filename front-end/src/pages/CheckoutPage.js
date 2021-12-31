import React from "react";
import styled from "styled-components";
import { PageHero, BorrowCheckout } from "../components";

const CheckoutPage = () => {
  return (
    <main>
      <PageHero title='דלפק' />
      <Wrapper className='page'>
        <BorrowCheckout />
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
