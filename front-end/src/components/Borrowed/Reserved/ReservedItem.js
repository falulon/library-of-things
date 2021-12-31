import React from "react";
import styled from "styled-components";
import { formatPrice } from "../../../utils/helpers";

const ReservedItem = React.forwardRef(
  ({ _id: id, image, name, price, location }, ref) => {
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
        <h5 className='subtotal'>{formatPrice(price)}</h5>

        <div></div>
        {/* <BorrowingUsers users={reservedTo} itemId={id} /> */}
      </Wrapper>
    );
  }
);

const Wrapper = styled.article`
button { margin: 4px 0;}  
.subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 1fr fit-content(200px) auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    height: 100%;
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
         gap: 1rem;
      text-align: left;
    }
        h2 {
        font-size: 1.5rem;
      }
    }
  }
`;

export default ReservedItem;
