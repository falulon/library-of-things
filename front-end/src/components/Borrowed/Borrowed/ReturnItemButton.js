import React, { useRef } from "react";
import { useBorrowContext } from "../../../context/borrow_context";

const ReturnItemButton = ({ userName, userId, refs, index, itemId }) => {
  const { returnOneItem } = useBorrowContext();
  const btnRef = useRef();

  const handleReturn = (productRef, btnRef, userId, itemId) => {
    productRef.style.textDecoration = "line-through 2px red";
    productRef.style.opacity = "0.7";
    btnRef.outerText = "π¬ β‘ ΧΧΧΧΧ¨ ππ» ";

    returnOneItem(userId, itemId);
  };

  return (
    <button
      ref={btnRef}
      onClick={(e) => {
        handleReturn(refs.current[index], btnRef.current, userId, itemId);
      }}
      className='user-btn'
    >
      πΊπ» {userName}
    </button>
  );
};

export default ReturnItemButton;
