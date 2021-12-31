import React, { useState } from "react";
import { axiosDeleteProduct } from "../../controllers/axiosUpdateProduct";
import { useHistory } from "react-router-dom";

const DeleteProduct = ({ productId, isUserAssoc }) => {
  const [sureToDelete, setSureToDelete] = useState(false);
  const history = useHistory();
  if (!productId) return <></>;

  const handleDeleteBtn = () => {
    if (isUserAssoc) {
      window.alert("לא ניתן למחוק חפצים מושאלים / מוזמנים");
      return;
    }
    setSureToDelete((prevState) => !prevState);
    if (!sureToDelete) window.alert("זהירות. מחיקה של חפץ היא בלתי הפיכה");
  };
  const trashIcon = <div onClick={handleDeleteBtn}>🚮</div>;
  const confirmDelete = (
    <div className='text-left'>
      {trashIcon}
      <button
        onClick={() => {
          axiosDeleteProduct(productId);
          handleDeleteBtn();
          setTimeout(() => {
            history.push("/");
            history.go(0);
          }, 1000);
        }}
      >
        ERASE ITEM
      </button>
    </div>
  );
  if (!sureToDelete) return trashIcon;
  return confirmDelete;
};

export default DeleteProduct;
