import React, { useContext, useState } from "react";
import { users_url as url } from "../utils/constants";
import { borrow_url } from "../utils/constants";

import axios from "axios";

const BorrowContext = React.createContext();

export const BorrowProvider = ({ children }) => {
  const [reservedItemsByUsers, setReservedItemsByUsers] = useState([]);
  const [borrowedItemsByUsers, setBorrowedItemsByUsers] = useState([]);
  const [numberOfBorrowing, setNumberOfBorrowing] = useState(0);
  // fetch a summary of all reserved items of all users
  const getAllReservedItems = async () => {
    const currentUrl = `${url}/reserve/all-by-users`;
    const response = await axios.get(currentUrl);
    const data = response.data;
    setReservedItemsByUsers(data);
  };

  const borrowOneItem = async (userId, productId) => {
    const currentUrl = `${borrow_url}/${userId}`;
    await axios.post(currentUrl, { productId });
    setTimeout(() => {
      setNumberOfBorrowing((prev) => prev + 1);
    }, 3000);
    // update the all reserved items? remove from list?
  };

  const returnOneItem = async (userId, productId) => {
    const currentUrl = `${borrow_url}/return/${userId}`;
    await axios.post(currentUrl, { productId });
  };

  const getAllBorrowedItems = async () => {
    const currentUrl = `${borrow_url}/all-by-users`;
    const response = await axios.get(currentUrl);
    const data = response.data;
    setBorrowedItemsByUsers(data);
  };

  return (
    <BorrowContext.Provider
      value={{
        getAllReservedItems,
        reservedItemsByUsers,
        borrowOneItem,
        getAllBorrowedItems,
        borrowedItemsByUsers,
        returnOneItem,
        numberOfBorrowing,
      }}
    >
      {children}
    </BorrowContext.Provider>
  );
};
// make sure use
export const useBorrowContext = () => {
  return useContext(BorrowContext);
};
