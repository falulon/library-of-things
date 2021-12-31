import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { formatPrice } from "../utils/helpers";
import CartItem from "./Cart/CartItem";
import { FaTrash } from "react-icons/fa";

const CheckoutForm = () => {
  const { cart, total_amount, clearCart } = useCartContext();
  const { myUser, attachItemsToUser, removeItemsFromUser } = useUserContext();
  const [itemList, setItemList] = useState([]);

  // move items from cart to reserved and assign to user
  useEffect(() => {
    if (itemList.length === 0 && cart.length !== 0) {
      setItemList([...cart]);
      attachItemsToUser(cart);
      clearCart();
    }
    // eslint-disable-next-line
  }, [cart]);

  // useEffect(() => {
  //   if (itemList.length !== 0) {
  //     clearCart();
  //   }
  //   // eslint-disable-next-line
  // }, [itemList]);

  const RemoveButton = () => {
    if (myUser && myUser.reservedItems.length === 0)
      return <p>אין חפצים שהוזמנו עבורך</p>;
    return (
      <button
        type='button'
        className='remove-btn'
        onClick={removeItemsFromUser}
      >
        <FaTrash />
        ביטול
      </button>
    );
  };

  return (
    <div>
      <article>
        <h4>{myUser && myUser.name}</h4>
        {total_amount > 0 && <p>סה"כ {formatPrice(total_amount)}</p>}
      </article>

      {myUser &&
        myUser.reservedItems.map((item, index) => {
          return (
            <CartItem key={item.id + index} {...item} disableRemove='true' />
          );
        })}
      {myUser && myUser.reservedItems.length > 0 && <h3>מחכים לך במחסן</h3>}
      <RemoveButton />
    </div>
  );
};

const ReservationCheckout = () => {
  return (
    <Wrapper>
      <CheckoutForm />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 3.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }

  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
`;

export default ReservationCheckout;
