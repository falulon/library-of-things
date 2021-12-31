import React, { useRef } from "react";
import { useBorrowContext } from "../../../context/borrow_context";

const BorrowingUsersButton = ({ userName, userId, refs, index, itemId }) => {
  const { borrowOneItem } = useBorrowContext();
  const btnRef = useRef();

  const handleBorrow = (productRef, btnRef, userId, itemId) => {
    productRef.style.textDecoration = "line-through 2px red";
    productRef.style.opacity = "0.6";
    btnRef.outerText = "⬅ נמסר 👌🏻 ";

    borrowOneItem(userId, itemId);
  };

  return (
    <button
      ref={btnRef}
      onClick={(e) => {
        handleBorrow(refs.current[index], btnRef.current, userId, itemId);
      }}
      className='user-btn'
    >
      👩🏻‍🔧 {userName}
    </button>
  );
};

export default BorrowingUsersButton;
