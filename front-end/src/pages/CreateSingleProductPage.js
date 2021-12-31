import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../context/user_context";
import { ProductImages, PageHero, Error } from "../components";
import { Link } from "react-router-dom";
import AccessRestricted from "../components/AccessRestricted";
import ProductInputFields from "../components/EditProduct/ProductInputFields";
import { axiosCreateProduct } from "../controllers/axiosUpdateProduct";

const CreateSingleProductPage = () => {
  const history = useHistory();
  const { myUser } = useUserContext();
  const [fetchError, setFetchError] = useState();

  const images = [{ url: "https://singlecolorimage.com/get/eff7ef/200x200" }];

  const prepareFormItems = (elements) => {
    const submittedInputs = Array.from(elements);
    return submittedInputs.reduce((all, item) => {
      if (item.value.length < 1) {
        return all;
      }

      const inputNameAndValue = { [item.name]: item.value };
      return { ...all, ...inputNameAndValue };
    }, {});
  };

  if (fetchError) {
    return <Error errMsg={fetchError} />;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const allInputs = Object.assign(prepareFormItems(e.target.elements));
    e.target.className += " loading";
    Promise.resolve(axiosCreateProduct(allInputs)).then((isError) =>
      setFetchError(isError)
    );
    setTimeout(() => {
      history.push("/");
      history.go(0);
    }, 3000);
  };

  const productInputProps = {
    submitHandler,
  };

  return (
    <Wrapper>
      <PageHero title='חפץ חדש' />
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          חזרה לחפצים
        </Link>
        {!myUser || myUser.authLevel < 1 ? (
          <AccessRestricted />
        ) : (
          <>
            <div className='product-center'>
              <ProductInputFields productProps={productInputProps} />
              <ProductImages images={images} />
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 3rem;
    align-items: center;
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      // align-items: start;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default CreateSingleProductPage;
