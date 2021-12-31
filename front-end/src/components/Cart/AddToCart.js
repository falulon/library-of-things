import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cart_context";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { _id: id } = product;
  const amount = 1;

  return (
    <Wrapper>
      <div className='btn-container'>
        <Link
          to='/cart'
          className='btn'
          onClick={() => addToCart(id, product, amount)}
        >
          הוספה
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;

  div {
    display: flex;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
    text-align: center;
  }
`;
export default AddToCart;
