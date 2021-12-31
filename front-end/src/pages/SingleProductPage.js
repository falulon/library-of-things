import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  PageHero,
} from "../components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams();
  const { myUser } = useUserContext();
  const [isAdmin, setIsAdmin] = useState(myUser && myUser.authLevel > 0);
  const [currentProduct, setCurrentProduct] = useState();
  const history = useHistory();

  // eslint-disable-next-line
  const hideEslint = () => {
    // eslint-disable-next-line
    const x = currentProduct;
    setIsAdmin("");
  };

  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  useEffect(() => {
    async function onLoad() {
      await fetchSingleProduct(`${url}${id}`);
      setCurrentProduct(product);
    }
    onLoad();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const {
    name,
    stock,
    price,
    description,
    comments,
    category,
    value,
    numOfUse,
    borrowHistory = [],
    returnDate,
    donatedFrom,
    _id: sku,
    image,
  } = product;

  const images = [
    {
      url:
        image !== ""
          ? image
          : "https://singlecolorimage.com/get/cebd6d/200x200",
    },
  ];
  const borrowHistoryUsers = borrowHistory.map((item, index) =>
    index !== borrowHistory.length - 1
      ? ` ${item.user.name},`
      : ` ${item.user.name}.`
  );

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          חזרה לחפצים{" "}
        </Link>
        <div className=' product-center'>
          <ProductImages images={images} />
          <section className='content'>
            <h2>{name}</h2>
            <h5 className='price'> {formatPrice(price)}</h5>
            {value && <p className='desc'> ערך כספי: {formatPrice(value)}</p>}
            <p className='desc'> {description}</p>
            <p className='desc'> {comments}</p>

            <p className='desc'>
              {" "}
              {donatedFrom ? <span>נתרם ע"י {donatedFrom} </span> : ""}
            </p>

            <p className='info'>
              <span>קטגוריה : </span>
              {category}
            </p>
            <p className='info'>
              <span>מקט : </span>
              {sku}
            </p>
            <p className='info'>
              <span>זמין : </span>
              {stock > 0 ? "יש במלאי" : "אין במלאי"}
            </p>
            {numOfUse && (
              <p className='info'>
                <span>מספר שימושים : </span>
                {numOfUse}
              </p>
            )}
            <p className='desc'> {returnDate}</p>
            {!!borrowHistory.length && (
              <p className='desc'>
                <span>השאלות קודמות : </span>
                {borrowHistoryUsers}
              </p>
            )}

            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
      {isAdmin && (
        <Link to={`/products/edit/${id}`} className='btn'>
          עריכה
        </Link>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
