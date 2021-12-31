import React, { useRef } from "react";
import styled from "styled-components";
import BorrowedItem from "./BorrowedItem";
import ReturnItemButton from "./ReturnItemButton";

const AllBorrowedItems = ({ items, userName, userId }) => {
  const refs = useRef([]);
  if (items.length < 1) return <p>הרשימה ריקה. אין חפצים מושאלים. </p>;

  return (
    <Wrapper className='section section-center'>
      {items.map((item, index) => {
        return (
          <div className='product' key={item._id + index}>
            <BorrowedItem
              {...item.items}
              date={item.date}
              ref={(element) => (refs.current[index] = element)}
            />
            <ReturnItemButton
              userName={userName}
              userId={userId}
              refs={refs}
              index={index}
              itemId={item.items._id}
            />
          </div>
        );
      })}
      <hr />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  button {
    margin: 4px 0;
  }
  .user-btn {
    background: transparent;
    border: 1px var(--clr-red-dark) solid;
    font-size: 1rem;
    padding: 0.2rem;
  }
  .user-btn:hover {
    background: var(--clr-red-dark);
    color: white;
    cursor: grab;
  }

  .product {
    display: grid;
    grid-template-columns: 3fr minmax(100px, auto);
    grid-gap: 20px;
    justify-content: space-between;
    align-items: center;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;

export default AllBorrowedItems;
