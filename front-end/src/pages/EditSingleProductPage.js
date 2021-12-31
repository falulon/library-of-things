import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";
import { single_product_url as url } from "../utils/constants";
import { Loading, Error, ProductImages, PageHero } from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { axiosUpdateProduct } from "../controllers/axiosUpdateProduct";
import AccessRestricted from "../components/AccessRestricted";
import ProductInputFields from "../components/EditProduct/ProductInputFields";

const EditSingleProductPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  const [currentProduct, setCurrentProduct] = useState();
  const [fetchError, setFetchError] = useState();
  const { myUser } = useUserContext();

  // eslint-disable-next-line
  const hideEslint = () => {
    // eslint-disable-next-line
    return currentProduct;
  };

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

  if (error || fetchError) {
    return <Error errMsg={fetchError} />;
  }

  const {
    name,
    stock,
    price,
    description,
    comments,
    category,
    borrowHistory = [],
    donatedFrom,
    _id: sku,
    image,
    reservedTo,
    currentlyBorrowedTo,
  } = product;

  const images = [{ url: image !== "" ? image : "https://picsum.photos/200" }];
  const isUserAssoc =
    (reservedTo && !!reservedTo.length) ||
    (currentlyBorrowedTo && !!currentlyBorrowedTo.length);

  const borrowHistoryUsers = borrowHistory.map((item, index) =>
    index !== borrowHistory.length - 1
      ? ` ${item.user.name},`
      : ` ${item.user.name}.`
  );

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

  const submitHandler = (e) => {
    e.preventDefault();
    const allInputs = Object.assign(prepareFormItems(e.target.elements));
    e.target.className += " loading";
    Promise.resolve(axiosUpdateProduct(sku, allInputs)).then((isError) =>
      setFetchError(isError)
    );

    setTimeout(() => {
      history.push("/");
      history.go(0);
    }, 3000);
  };

  const productInputProps = {
    isUserAssoc,
    name,
    price,
    description,
    category,
    comments,
    donatedFrom,
    stock,
    id,
    image,
    borrowHistory,
    borrowHistoryUsers,
    submitHandler,
  };
  return (
    <Wrapper>
      <PageHero title={name} product />
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
      <Link to={`/products/edit/create`} className='btn'>
        הוספת חפץ חדש ➕
      </Link>
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
  .hidden {
    display: none;
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export default EditSingleProductPage;
