import React from "react";
import styled from "styled-components";
import { formatDate } from "../../../utils/helpers";

const BorrowedItem = React.forwardRef(
  ({ _id: id, image, name, date, location }, ref) => {
    return (
      <Wrapper ref={ref}>
        <div className='title'>
          <img src={image} alt={name} />
          {/* <h5 className='price-small'>{formatPrice(price)}</h5> */}
        </div>
        <h5 className='name tooltip'>
          {name}
          <span className='tooltiptext'>{location}</span>
        </h5>
        <h5 className='subtotal'>{formatDate(date)}</h5>
        <div></div>
      </Wrapper>
    );
  }
);

const Wrapper = styled.article`
button { margin: 4px 0;}  

  display: grid;
  grid-template-columns: 1fr fit-content(200px) auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    height: 100%;
    // display: grid;
    // grid-template-columns: fit-content(75px) fit-content(125px);
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    max-height: 100px;
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  h5 {
    font-size: 0.75rem;
    // margin-bottom: 0;
  }

  .color {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
  .price-small {
    color: var(--clr-primary-5);
  }
  .user-btn {
    background: transparent;
    border: 1px var(--clr-red-dark) solid;
    font-size: 1rem;
    padding: 0.2rem;
    }
    .user-btn:hover {
      background:var(--clr-red-dark);
      color: white;
      cursor: grab;
      }
  }
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
  }
  
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
  
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  @media (min-width: 776px) {
    .subtotal {
      display: block;
      // margin-bottom: 0;
      color: var(--clr-grey-5);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-5);
      font-weight: 400;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: minmax(100px, 200px) 2fr 1fr 1fr;
    align-items: center;
    justify-content: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      // display: grid;
      // grid-template-columns: 100px 200px;
      // align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`;

export default BorrowedItem;
