import React, { useState } from "react";
import DeleteProduct from "./DeleteProduct";
import ImgUploadForm from "./ImgUploadForm";
import styled from "styled-components";

const ProductInputFields = ({ productProps }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const isLoading = () => {
    setIsUploading((prev) => !prev);
  };

  const newImgUrl = (url) => {
    setImgUrl(url);
  };

  const {
    isUserAssoc,
    name,
    price,
    description,
    comments,
    category,
    donatedFrom,
    stock,
    id: sku,
    image,
    borrowHistory = [],
    borrowHistoryUsers,
    submitHandler,
  } = productProps;

  return (
    <Wrapper>
      <section className='content'>
        <DeleteProduct productId={sku} isUserAssoc={isUserAssoc} />
        <form onSubmit={submitHandler} className='form-grid'>
          <button type='submit' className='btn btn-save'>
            שמירה
          </button>
          <label htmlFor='name'>שם</label>
          <input type='text' defaultValue={name} name='name' required />
          <label htmlFor='price'>מחיר</label>
          <input
            type='number'
            defaultValue={price}
            name='price'
            required
          ></input>
          <label htmlFor='description'>תיאור</label>
          <textarea
            name='description'
            cols='30'
            rows='5'
            defaultValue={description}
          />
          <label htmlFor='comments'>הערות</label>
          <textarea
            name='comments'
            cols='30'
            rows='5'
            defaultValue={comments}
          />

          <label htmlFor='category'>קטגוריה</label>
          <input type='text' defaultValue={category} name='category' required />

          <label htmlFor='donatedFrom'>נתרם על ידי</label>
          <input type='text' defaultValue={donatedFrom} name='donatedFrom' />

          <label htmlFor='stock'>כמות במלאי</label>
          <input
            type='number'
            defaultValue={stock}
            name='stock'
            required
          ></input>
          <p className='info'>
            <span>מקט:</span>
          </p>
          <p>{sku}</p>
          <label htmlFor='image'>כתובת תמונה</label>
          <input
            type='text'
            placeholder={image}
            defaultValue={imgUrl}
            name='image'
            className={isUploading ? "loading" : undefined}
          />
        </form>
        <div className='col2'>
          <ImgUploadForm newImgUrl={newImgUrl} isLoading={isLoading} />
          {imgUrl && <img src={imgUrl} alt='uploaded file' width='100%' />}
        </div>
        {!!borrowHistory.length && (
          <p className='desc'>
            <span>השאלות קודמות : </span>
            {borrowHistoryUsers}
          </p>
        )}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .form-grid, .col2 {
    display: grid;
    grid-template-columns: fit-content(150px) auto;
    gap: 20px;
    font-size: 1rem;
    margin: 10px auto;
    align-items: center;
  }

  .col2 { 
    align-items: normal;
  }

  .col2 img { 
      max-width: 200px;
  }
  input,
  textarea {
    font-size: 1.2rem;
    font-weight: 400;
    background: transparent;
    border: 1px #6c757d solid;
    padding: 1rem;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
textarea:invalid, input:invalid { 
  background: rgba(180, 22, 44, 0.1);
}
.btn-save {
  background: #42ba96;
  padding: 1rem ;
  font-size: 1rem;
  grid-column: span 2;
  
}
  }
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
 
  .hidden { 
    display: none;
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  
  }
`;

export default ProductInputFields;
