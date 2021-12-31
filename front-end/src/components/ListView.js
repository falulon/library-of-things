import React from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
const ListView = ({ products }) => {
  return (
    <Wrapper>
      {products.map((product) => {
        const { _id: id, image, name, price, stock } = product;
        const imageUrl = image || "https://picsum.photos/200";
        const isLowStock = stock === 0 ? "out-of-stock" : "";

        return (
          <article key={id} className={isLowStock}>
            <img src={imageUrl} alt={name} />
            <div>
              <h4>{name}</h4>
              <h5 className='price'>
                {price === 0 ? null : formatPrice(price)}
              </h5>

              {/* <p>{description.substring(0, 150)}...</p> */}
              <Link to={`/products/${id}`} className='btn'>
                פרטים
              </Link>
            </div>
          </article>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
  }

  .out-of-stock {
    opacity: 0.3;
  }

  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

export default ListView;
